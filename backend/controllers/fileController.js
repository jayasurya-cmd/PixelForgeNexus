const fs = require('fs');
const path = require('path');
const Project = require('../models/Project');
const { encryptFile } = require('../middleware/encryptFile');

exports.uploadFile = async (req, res) => {
  try {
    const { projectId } = req.body;
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    const { iv, data } = encryptFile(file.buffer);
    const filename = `${Date.now()}_${file.originalname}.enc`;
    const filepath = path.join(__dirname, '../uploads', filename);

    const payload = JSON.stringify({ iv, data });
    fs.writeFileSync(filepath, payload);

    project.documents.push(filename);
    await project.save();

    res.json({ message: 'File uploaded successfully', filename });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
