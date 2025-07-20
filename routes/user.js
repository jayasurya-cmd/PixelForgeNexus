const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

router.get('/developers', auth, async (req, res) => {
  try {
    const devs = await User.find({ role: 'developer' }).select('_id username');
    res.json(devs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch developers' });
  }
});

module.exports = router;
