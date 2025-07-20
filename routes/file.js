const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const encryptFile = require('../middleware/encryptFile');
const auth = require('../middleware/auth'); // your JWT auth middleware

const upload = multer({ dest: 'temp/' }); // uploaded file lands in temp/

router.post('/upload', auth, upload.single('file'), async (req, res) => {
  try {
    const { projectId } = req.body;
    if (!projectId || !req.file) {
      return res.status(400).json({ error: 'Project ID and file required' });
    }

    const tempPath = req.file.path;
    const encryptedPath = path.join(__dirname, '..', 'uploads', `${req.file.filename}.enc`);

    await encryptFile(tempPath, encryptedPath);
    fs.unlinkSync(tempPath); // remove original file

    res.json({ message: '✅ File encrypted and uploaded successfully' });
  } catch (err) {
    console.error('❌ Upload error:', err.message);
    res.status(500).json({ error: 'File upload failed' });
  }
});

module.exports = router;
