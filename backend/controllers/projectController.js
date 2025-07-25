const Project = require('../models/Project');

exports.getProjects = async (req, res) => {
  try {
    const user = req.user;
    let projects;

    if (user.role === 'admin') {
      projects = await Project.find();
    } else if (user.role === 'lead') {
      projects = await Project.find({ createdBy: user.id });
    } else {
      projects = await Project.find({ assignedDevs: user.id });
    }

    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProject = async (req, res) => {
  try {
    const { name, description, deadline } = req.body;
    const newProject = new Project({
      name,
      description,
      deadline,
      createdBy: req.user.id
    });

    await newProject.save();
    res.json(newProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.markComplete = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    project.completed = true;
    await project.save();

    res.json({ message: 'Project marked as complete' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.assignDevelopers = async (req, res) => {
  try {
    const { projectId, developerIds } = req.body;
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    project.assignedDevs.push(...developerIds);
    await project.save();

    res.json({ message: 'Developers assigned' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
