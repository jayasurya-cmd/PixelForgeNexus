const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true },
  role: { type: String, enum: ['admin', 'lead', 'developer'], default: 'developer' },
  mfaSecret: { type: String },
  mfaEnabled: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);
