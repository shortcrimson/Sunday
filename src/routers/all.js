const express = require('express');
const Project = require('../models/project');
const Folder = require('../models/folder');
const Task = require('../models/task');
const router = new express.Router();

//Read
router.get('/all', async (req, res) => {
	
	const response = {}
	
	try {
		response.projects = await Project.find();
		response.folders = await Folder.find();
		response.tasks = await Task.find();
		res.send(response);
	} catch (e) {
		res.status(500).send(e);
	}
});

module.exports = router;