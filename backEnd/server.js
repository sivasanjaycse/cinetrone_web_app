require('dotenv').config(); // MUST be the first line
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const connectDB = require('./mongooseConnection');
const User = require('./model/User');
const Otp = require('./model/Otp');
const Product = require('./model/Product');
const Cart = require('./model/Cart');
const { sendEmail } = require('./emailService');

// --- 1. INITIAL SETUP ---
connectDB();
const app = express();
const JWT_SECRET = process.env.JWT_SECRET;

// --- 2. CRITICAL MIDDLEWARE CONFIGURATION ---
// The order of these 'app.use()' calls is crucial.

// Step A: Configure CORS to grant permission for browser requests.
app.use(cors({
  origin: '*', // In production, replace with your frontend's actual domain
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Step B: Configure the JSON body parser.
app.use(express.json());


// --- 3. SECURITY MIDDLEWARE DEFINITION ---
const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'No token or invalid token format, authorization denied' });
    }
    try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

// --- 4. API ROUTES ---
// All route definitions must come AFTER the middleware configuration.

// == Product Routes ==
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ msg: 'Server error while fetching products.' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ product_id: req.params.id });
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ msg: 'Server error while fetching product.' });
  }
});

// == User Profile Route ==
app.get('/api/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        const userProfile = { name: user.name, email: user.email, mobile: user.phone };
        res.json({ user: userProfile });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// == Cart Routes ==
app.get('/api/cart', authMiddleware, async (req, res) => {
    try {
        const cart = await Cart.findOne({ email: req.user.email });
        if (!cart || cart.products.length === 0) return res.json({ products: [] });
        const productIds = cart.products.map(item => item.productId);
        const productsDetails = await Product.find({ 'product_id': { $in: productIds } });
        const productMap = productsDetails.reduce((acc, product) => {
            acc[product.product_id] = product;
            return acc;
        }, {});
        const populatedCart = cart.products.map(item => ({
            productId: productMap[item.productId],
            quantity: item.quantity
        })).filter(item => item.productId);
        res.json({ products: populatedCart });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

app.post('/api/cart/sync', authMiddleware, async (req, res) => {
    const { products } = req.body;
    try {
        const cartData = { email: req.user.email, products: products, lastModified: new Date() };
        const cart = await Cart.findOneAndUpdate({ email: req.user.email }, cartData, { new: true, upsert: true });
        res.json(cart);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// == OTP Management Routes ==
app.post('/registerOtp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ msg: 'Please provide an email address.' });
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  try {
    await Otp.findOneAndUpdate({ email }, { otp }, { upsert: true, new: true });
    await sendEmail(email, 'Your Registration OTP Code', `Your OTP is: ${otp}`);
    res.status(200).json({ msg: `OTP sent successfully to ${email}` });
  } catch (error) {
    res.status(500).json({ msg: 'Error sending OTP.' });
  }
});

app.post('/forgetPasswordOtp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ msg: 'Please provide an email address.' });
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: 'User with this email does not exist.' });
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await Otp.findOneAndUpdate({ email }, { otp }, { upsert: true, new: true });
    await sendEmail(email, 'Your Password Reset Code', `Your verification code is: ${otp}`);
    res.status(200).json({ msg: `Password reset OTP sent to ${email}` });
  } catch (error) {
    res.status(500).json({ msg: 'Error sending OTP.' });
  }
});

app.post('/verifyOtp', async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ msg: 'Please provide both email and OTP.' });
  const otpRecord = await Otp.findOne({ email, otp });
  if (!otpRecord) return res.status(400).json({ msg: 'OTP has expired or is invalid.' });
  await Otp.deleteOne({ email });
  res.status(200).json({ msg: 'Verified successfully!' });
});

// == User Authentication Routes ==
app.post('/register', async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    if (await User.findOne({ email })) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    const newUser = new User({ name, email, phone, password });
    await newUser.save();
    // For automatic login after registration, you can generate a token here as well.
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Authentication failed: Invalid credentials' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Authentication failed: Invalid credentials' });
        const payload = { user: { id: user.id, email: user.email, name: user.name } };
        jwt.sign(payload, JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
            if (err) throw err;
            res.json({
                msg: 'Authentication successful!',
                token: token,
                user: { name: user.name, email: user.email, mobile: user.phone }
            });
        });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

app.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) return res.status(400).json({ msg: 'Please provide both email and a new password.' });
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: 'User not found.' });
    user.password = newPassword;
    await user.save();
    res.status(200).json({ msg: 'Password has been reset successfully!' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error. Please try again later.' });
  }
});


// --- 5. START SERVER ---
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});