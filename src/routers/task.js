const express = require('express');
const Task = require('../models/task');
const router = new express.Router();

//Create
router.post('/tasks', async (req, res) => {
	const task = new Task(req.body);
	try {
		await task.save();
		res.status(201).send(task);
	} catch(e) {
		res.status(400).send(e);
	}
});

//Read
router.get('/tasks', async (req, res) => {
	try {
		const tasks = await Task.find(req.query).populate('folder');
		res.send(tasks);
	} catch (e) {
		res.status(500).send(e);
	}
});

router.get('/tasks/:id', async (req, res) => {
	try {
		const task = await Task.findById(req.params.id).populate('folder');
		if (!task) {
			return res.status(404).send();
		}
		res.send(task);
	} catch(e) {
		res.status(500).send(e);
	}
});

//Update
router.patch('/tasks/:id', async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['description', 'task_type', 'priority'];
	const isValidOperation = updates.every(update => allowedUpdates.includes(update));

	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid updates!' });
	}

	try {
		const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true });
		//Options - new returns the modified object rather than the original
		if (!task) {
			return rest.status(404).send();
		}
		res.send(task);
	} catch (e) {
		res.status(400).send(e);
	}
});


//Delete
router.delete('/tasks/:id', async (req, res) => {
	try {
		const task = await Task.findByIdAndDelete(req.params.id);
		if (!task) {
			return res.status(404).send();
		}
		res.send(task);
	} catch (e) {
		res.status(500).send(e);
	}
});

module.exports = router;