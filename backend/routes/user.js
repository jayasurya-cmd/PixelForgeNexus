const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.use(auth);
router.get('/', role('admin', 'lead'), controller.getAllUsers);

module.exports = router;
