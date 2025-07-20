const Project = require('../models/Project');

// Create new project
exports.createProject = async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).send('Only admins can create projects');
    
    const { name, description, deadline } = req.body;
    const newProject = new Project({
      name,
      description,
      deadline,
      createdBy: req.user.id
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('createdBy', 'username');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mark project complete
exports.markComplete = async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).send('Only admins can mark complete');

    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).send('Project not found');

    project.status = 'Completed';
    await project.save();

    res.json({ message: 'Project marked as completed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const User = require('../models/User');

exports.assignDevelopers = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Only admins can assign developers' });
    }

    const { projectId, developerIds } = req.body;

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    // Check if all user IDs are real and are developers
    const developers = await User.find({ _id: { $in: developerIds }, role: 'developer' });
    if (developers.length !== developerIds.length) {
      return res.status(400).json({ error: 'Some user IDs are invalid or not developers' });
    }

    project.assignedDevs = developerIds;
    await project.save();

    res.json({ message: 'Developers assigned successfully', assignedDevs: project.assignedDevs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
