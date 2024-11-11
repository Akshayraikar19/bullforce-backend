const User = require('../models/user-model')
const nodemailer = require('nodemailer')
const {validationResult} = require('express-validator')
const usersCltr = {}

usersCltr.login = async (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body;
  const otp = Math.floor(1000 + Math.random() * 9000).toString(); // 4 digits otp
  const otpExpires = Date.now() + 300000; // 5 minutes in milliseconds (5 * 60 * 1000)

  try {
      let user = await User.findOne({ email });
      if (!user) user = new User({ email });

      user.otp = otp;
      user.otpExpires = otpExpires;
      await user.save();

      const transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
              user: process.env.EMAIL,
              pass: process.env.PASS,
          },
      });

      await transporter.sendMail({
          to: email,
          subject: 'Your OTP Code to Bull Force',
          text: `Hello,

          Your One-Time Password (OTP) for accessing your BullForce account is: ${otp}.

          Please enter this code on the login page to complete your authentication. For your security, this OTP is valid for a limited time.

          If you did not request this code, please ignore this email or contact our support team.

          Thank you for choosing BullForce!

          Best regards,
          The BullForce Team`,
      });

      res.json({ message: 'OTP sent to your email' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
  }
};

usersCltr.verifyOtp = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email, otp, otpExpires: { $gt: Date.now() } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    res.json({ message: 'OTP verified successfully! Welcome to BullForce!' });
  } catch (error) {
    console.error(error); // For debugging purposes
    res.status(500).json({ error: 'Server error' });
  }
};


module.exports = usersCltr


