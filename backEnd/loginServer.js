const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const connectDB = require('./mongooseConnection');
const User = require('./model/User');
const Otp = require('./model/Otp');
const { sendEmail } = require('./emailService');

// --- 1. INITIAL SETUP ---

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // To parse JSON request bodies

// --- 2. HELPER FUNCTIONS ---

/**
 * Generates a random 6-digit OTP.
 * @returns {string} The 6-digit OTP as a string.
 */
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// --- 3. API ROUTES ---

// == OTP Management Routes ==

app.post('/registerOtp', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ msg: 'Please provide an email address.' });
  }

  const otp = generateOtp();
  const subject = 'Your Registration OTP Code';
  const text = `Welcome to Cinetrone! Your One-Time Password (OTP) for registration is: ${otp}. This code is valid for 5 minutes. `;

  try {
    // Store/update the OTP in the database (expires automatically via TTL index)
    await Otp.findOneAndUpdate({ email }, { otp }, { upsert: true, new: true });
    await sendEmail(email, subject, text);
    res.status(200).json({ msg: `✅ OTP sent successfully to ${email}` });
  } catch (error) {
    console.error('Error sending registration OTP:', error);
    res.status(500).json({ msg: 'Error sending OTP. Please try again later.' });
  }
});

// == THIS ROUTE IS NOW UPDATED ==
app.post('/forgetPasswordOtp', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ msg: 'Please provide an email address.' });
  }

  try {
    // --- ADDED: Check if the user exists in the database ---
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: 'User with this email does not exist.' });
    }
    // --- End of added check ---

    const otp = generateOtp();
    const subject = 'Your Password Reset Code';
    const text = `Greetings from Cinetrone! You requested a password reset. Your Verification code is: ${otp}. This code is valid for 5 minutes.`;

    await Otp.findOneAndUpdate({ email }, { otp }, { upsert: true, new: true });
    await sendEmail(email, subject, text);
    res.status(200).json({ msg: `✅ Password reset OTP sent successfully to ${email}` });
  } catch (error) {
    console.error('Error sending password reset OTP:', error);
    res.status(500).json({ msg: 'Error sending OTP. Please try again later.' });
  }
});


app.post('/verifyOtp', async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ msg: 'Please provide both email and Verification Code.' });
  }

  const otpRecord = await Otp.findOne({ email, otp });

  if (!otpRecord) {
    return res.status(400).json({ msg: 'Verification Code has expired or is invalid.' });
  }

  // OTP is correct, delete it to prevent reuse
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
    await newUser.save(); // Password is hashed by the pre-save hook in the User model

    res.status(201).json({ msg: '✅ User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Authentication failed: Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Authentication failed: Invalid credentials' });
    }

    res.status(200).json({ msg: '🔑 Authentication successful!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ msg: 'Please provide both email and a new password.' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: 'User not found.' });
    }

    user.password = newPassword;
    await user.save(); // The pre-save hook will hash the new password

    res.status(200).json({ msg: '🔑 Password has been reset successfully!' });
  } catch (error) {
    console.error('Error during password reset:', error);
    res.status(500).json({ msg: 'Server error. Please try again later.' });
  }
});

// --- 4. START SERVER ---

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});