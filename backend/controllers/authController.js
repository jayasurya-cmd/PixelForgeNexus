const bcrypt = require('bcrypt');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ error: 'Username already taken' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const secret = speakeasy.generateSecret({ name: `PixelForge (${username})` });

    const user = new User({
      username,
      hashedPassword,
      role,
      mfaSecret: secret.base32,
      mfaEnabled: true
    });

    await user.save();
    const qr = await qrcode.toDataURL(secret.otpauth_url);

    res.json({ message: 'User registered', qrImage: qr });
  } catch (err) {
    res.status(500).json({ error: 'Server error during registration' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password, token } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const valid = await bcrypt.compare(password, user.hashedPassword);
    if (!valid) return res.status(401).json({ error: 'Incorrect password' });

    if (user.mfaEnabled) {
      const tokenValid = speakeasy.totp.verify({
        secret: user.mfaSecret,
        encoding: 'base32',
        token
      });
      if (!tokenValid) return res.status(401).json({ error: 'Invalid MFA token' });
    }

    const jwtToken = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', token: jwtToken });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};
