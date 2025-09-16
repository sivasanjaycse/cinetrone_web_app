const express = require('express');
// const connectDB = require('./mongooseConnection'); // Assuming this connects to your DB
const User = require('./model/User'); 
const Otp = require('./model/Otp'); // --- ADDED: Import the new Otp model ---
const bcrypt = require('bcryptjs');
const { sendEmail } = require('./emailService'); 

// Connect to database
// connectDB();

const app = express();
app.use(express.json());


// --- REMOVED: In-Memory OTP Storage ---
// const otpStore = new Map();


/**
 * Generates a random 6-digit OTP.
 * @returns {string} The 6-digit OTP as a string.
 */
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

//--- OTP ROUTES ---//

app.post('/registerOtp', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ msg: 'Please provide an email address.' });
  }

  const otp = generateOtp();
  const subject = 'Your Registration OTP Code';
  const text = `Welcome! Your One-Time Password (OTP) for registration is: ${otp}. This code is valid for 5 minutes.`;

  try {
    // --- MODIFIED: Store the OTP in the database ---
    // This will create a new OTP or update the existing one for the same email
    await Otp.findOneAndUpdate({ email }, { otp }, { upsert: true, new: true });

    await sendEmail(email, subject, text);
    res.status(200).json({ msg: `✅ OTP sent successfully to ${email}` });
  } catch (error) {
    console.error('Error sending registration OTP:', error);
    res.status(500).json({ msg: 'Error sending OTP. Please try again later.' });
  }
});

app.post('/forgetPasswordOtp', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ msg: 'Please provide an email address.' });
  }

  const otp = generateOtp();
  const subject = 'Your Password Reset Code';
  const text = `You requested a password reset. Your OTP is: ${otp}. This code is valid for 5 minutes.`;

  try {
    // --- MODIFIED: Store the OTP in the database ---
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
    return res.status(400).json({ msg: 'Please provide both email and OTP.' });
  }

  // --- MODIFIED: Look for the OTP in the database ---
  const otpRecord = await Otp.findOne({ email, otp });

  // If no record is found, the OTP is either wrong or has expired (and been auto-deleted)
  if (!otpRecord) {
    return res.status(400).json({ msg: 'OTP has expired or is invalid.' });
  }

  // --- IMPORTANT: Delete the OTP after successful verification ---
  await Otp.deleteOne({ email });
  
  res.status(200).json({ msg: '🎉 OTP verified successfully!' });
});


// ... (Your /register, /login, and /reset-password routes remain the same) ...


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});