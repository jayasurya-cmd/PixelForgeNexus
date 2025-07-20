const bcrypt = require('bcrypt');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 🔐 Register a new user with MFA
const register = async (req, res) => {
  console.log("📥 Register request received");

  try {
    const { username, password, role } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate MFA secret
    const secret = speakeasy.generateSecret({ name: `PixelForge (${username})` });

    const user = new User({
      username,
      hashedPassword,
      role,
      mfaSecret: secret.base32,
      mfaEnabled: true
    });

    await user.save();

    const qrCodeImage = await qrcode.toDataURL(secret.otpauth_url);

    console.log("✅ User registered:", user.username);
    res.json({
      message: 'User created successfully',
      username: user.username,
      qrImage: qrCodeImage
    });
  } catch (err) {
    console.error("❌ Register error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// 🔐 Login with password + MFA token
const login = async (req, res) => {
  console.log("🔐 Login request received");

  try {
    const { username, password, token } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      console.log("❌ User not found");
      return res.status(404).json({ error: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, user.hashedPassword);
    if (!validPassword) {
      console.log("❌ Incorrect password");
      return res.status(401).json({ error: 'Incorrect password' });
    }

    if (user.mfaEnabled) {
      const tokenValid = speakeasy.totp.verify({
        secret: user.mfaSecret,
        encoding: 'base32',
        token
      });

      if (!tokenValid) {
        console.log("❌ Invalid MFA token");
        return res.status(401).json({ error: 'Invalid MFA token' });
      }
    }

    const jwtToken = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log("✅ Login successful for:", user.username);
    res.json({ message: 'Login successful', token: jwtToken });
  } catch (err) {
    console.error("❌ Login error:", err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// ✅ Export both
module.exports = {
  register,
  login
};
