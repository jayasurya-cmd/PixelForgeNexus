const User = require('../models/User');

exports.getUsersByRole = async (req, res) => {
  try {
    const { role } = req.query;

    if (!role) {
      return res.status(400).json({ error: 'Please provide a role (e.g., ?role=developer)' });
    }

    const users = await User.find({ role }).select('_id username role');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
