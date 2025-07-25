const express = require('express');
const router = express.Router();
const controller = require('../controllers/fileController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const upload = require('../middleware/upload');

router.post('/upload', auth, upload.single('file'), controller.uploadFile);

module.exports = router;
