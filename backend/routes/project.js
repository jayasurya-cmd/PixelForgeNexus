const express = require('express');
const router = express.Router();
const controller = require('../controllers/projectController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.use(auth);
router.get('/', controller.getProjects);
router.post('/', role('admin'), controller.createProject);
router.patch('/:id/complete', role('admin'), controller.markComplete);
router.patch('/assign', role('lead'), controller.assignDevelopers);

module.exports = router;
