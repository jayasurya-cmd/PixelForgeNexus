const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authenticate = require('../middleware/auth');


router.use(authenticate);
router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.find().populate('createdBy', 'username');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post('/', projectController.createProject);
router.get('/', projectController.getProjects);
router.patch('/:id/complete', projectController.markComplete);
router.patch('/assign', projectController.assignDevelopers);


module.exports = router;

