const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  deadline: Date,
  completed: { type: Boolean, default: false },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedDevs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  documents: [{ type: String }]
});

module.exports = mongoose.model('Project', projectSchema);
