const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  originalName: String,
  encryptedName: String,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('File', FileSchema);
