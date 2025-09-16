const express = require('express');
const connectDB = require('./mongooseConnection'); // From previous answer
const User = require('./model/User'); // Import the User model
const bcrypt = require('bcryptjs');
const { sendEmail } = require('./emailService'); // Import our email function

// Connect to database
connectDB();

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

//--- ROUTES ---//

/**
 * @route   POST /register
 * @desc    Register a new user
 * @access  Public
 */
app.post('/register', async (req, res) => {
  // Destructure name, email, phone, and password from request body
  const { name, email, phone, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create a new user instance (password will be hashed by the pre-save hook)
    user = new User({
      name,
      email,
      phone,
      password,
    });

    // Save the user to the database
    await user.save();

    res.status(201).json({ msg: '✅ User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

/**
 * @route   POST /login
 * @desc    Authenticate user & get token
 * @access  Public
 */
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Authentication failed: Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Authentication failed: Invalid credentials' });
    }

    // If credentials match, send success response
    // In a real app, you would generate and return a JWT (JSON Web Token) here
    res.status(200).json({ msg: '🔑 Authentication successful!' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// --- NEW: In-Memory OTP Storage ---
// A Map to temporarily store OTPs with the user's email as the key.
// Format: { 'user@example.com': '123456' }
const otpStore = new Map();

/**
 * Generates a random 6-digit OTP.
 * @returns {string} The 6-digit OTP as a string.
 */
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

//--- OTP ROUTES ---//

/**
 * @route   POST /registerOtp
 * @desc    Send an OTP for new user registration and store it
 * @access  Public
 */
app.post('/registerOtp', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ msg: 'Please provide an email address.' });
  }

  const otp = generateOtp();
  const subject = 'Your Registration OTP Code';
  const text = `Welcome! Your One-Time Password (OTP) for registration is: ${otp}. This code is valid for 5 minutes.`;

  try {
    // --- MODIFIED: Store the OTP with a 5-minute expiration ---
    otpStore.set(email, otp);
    setTimeout(() => {
      otpStore.delete(email);
    }, 300000); // 300,000 milliseconds = 5 minutes

    await sendEmail(email, subject, text);
    res.status(200).json({ msg: `✅ OTP sent successfully to ${email}` });
  } catch (error) {
    console.error('Error sending registration OTP:', error);
    res.status(500).json({ msg: 'Error sending OTP. Please try again later.' });
  }
});

/**
 * @route   POST /forgetPasswordOtp
 * @desc    Send an OTP for password reset and store it
 * @access  Public
 */
app.post('/forgetPasswordOtp', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ msg: 'Please provide an email address.' });
  }

  const otp = generateOtp();
  const subject = 'Your Password Reset Code';
  const text = `You requested a password reset. Your OTP is: ${otp}. This code is valid for 5 minutes.`;

  try {
    // --- MODIFIED: Store the OTP with a 5-minute expiration ---
    otpStore.set(email, otp);
    setTimeout(() => {
      otpStore.delete(email);
    }, 300000); // 5 minutes

    await sendEmail(email, subject, text);
    res.status(200).json({ msg: `✅ Password reset OTP sent successfully to ${email}` });
  } catch (error) {
    console.error('Error sending password reset OTP:', error);
    res.status(500).json({ msg: 'Error sending OTP. Please try again later.' });
  }
});


/**
 * @route   POST /verifyOtp
 * @desc    Verify the OTP provided by the user
 * @access  Public
 */
app.post('/verifyOtp', (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ msg: 'Please provide both email and OTP.' });
  }

  const storedOtp = otpStore.get(email);

  // Check if OTP exists in our store
  if (!storedOtp) {
    return res.status(400).json({ msg: 'OTP has expired or is invalid.' });
  }

  // Check if the provided OTP matches the stored one
  if (storedOtp === otp) {
    // --- IMPORTANT: Delete the OTP after successful verification ---
    otpStore.delete(email);
    res.status(200).json({ msg: '🎉 OTP verified successfully!' });
  } else {
    res.status(400).json({ msg: 'Invalid OTP.' });
  }
});

// (Your other routes like /register, /login, /registerOtp, etc., would be here)

/**
 * @route   POST /reset-password
 * @desc    Reset a user's password after validation
 * @access  Protected (should be, see security note)
 */
app.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;

  // Basic validation
  if (!email || !newPassword) {
    return res.status(400).json({ msg: 'Please provide both email and a new password.' });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: 'User not found.' });
    }

    // Set the new password on the user object
    user.password = newPassword;

    // Save the user. The 'pre-save' hook in your User model will automatically hash the password.
    await user.save();

    res.status(200).json({ msg: '🔑 Password has been reset successfully!' });
  } catch (error) {
    console.error('Error during password reset:', error);
    res.status(500).json({ msg: 'Server error. Please try again later.' });
  }
});

// (Your server listener code would be here)
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});