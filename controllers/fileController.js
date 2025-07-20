const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const File = require('../models/File');

const algorithm = 'aes-256-cbc';
const secretKey = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

exports.uploadFile = async (req, res) => {
  try {
    const inputPath = req.file.path;
    const outputPath = path.join('uploads', 'enc_' + req.file.filename);

    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const input = fs.createReadStream(inputPath);
    const output = fs.createWriteStream(outputPath);

    input.pipe(cipher).pipe(output);

    output.on('finish', async () => {
      const file = new File({
        originalName: req.file.originalname,
        encryptedName: 'enc_' + req.file.filename,
        uploadedBy: req.user.id,
        projectId: req.body.projectId
      });

      await file.save();
      fs.unlinkSync(inputPath); // Delete the unencrypted file

      res.status(201).json({ message: 'File uploaded and encrypted successfully', file });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.downloadFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ error: 'File not found' });

    const inputPath = path.join('uploads', file.encryptedName);
    const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);

    res.setHeader('Content-Disposition', `attachment; filename="${file.originalName}"`);
    const input = fs.createReadStream(inputPath);
    input.pipe(decipher).pipe(res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
