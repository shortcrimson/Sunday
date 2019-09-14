const express = require('express');
const Project = require('../models/project');
const router = new express.Router();

//Create
router.post('/projects', async (req, res) => {
	const project = new Project(req.body);
	try {
		await project.save();
		res.status(201).send(project);
	} catch(e) {
		res.status(400).send(e);
	}
});

//Read
router.get('/projects', async (req, res) => {
	try {
		const projects = await Project.find(req.query);
		res.send(projects);
	} catch (e) {
		res.status(500).send(e);
	}
});

router.get('/projects/:id', async (req, res) => {
	try {
		const project = await Project.findById(req.params.id);
		if (!project) {
			return res.status(404).send();
		}
		res.send(project);
	} catch(e) {
		res.status(500).send(e);
	}
});

//Update
router.patch('/projects/:id', async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['name', 'description'];
	const isValidOperation = updates.every(update => allowedUpdates.includes(update));

	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid updates!' });
	}

	try {
		const project = await Project.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true });
		//Options - new returns the modified object rather than the original
		if (!project) {
			return rest.status(404).send();
		}
		res.send(project);
	} catch (e) {
		res.status(400).send(e);
	}
});


//Delete
router.delete('/projects/:id', async (req, res) => {
	try {
		const project = await Project.findByIdAndDelete(req.params.id);
		if (!project) {
			return res.status(404).send();
		}
		res.send(project);
	} catch (e) {
		res.status(500).send(e);
	}
});

module.exports = router;