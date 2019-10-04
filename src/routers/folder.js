const express = require('express');
const Folder = require('../models/folder');
const router = new express.Router();


//Create
router.post('/folders', async (req, res) => {
	const folder = new Folder(req.body);
	try {
		await folder.save();
		res.status(201).send(folder);
	} catch(e) {
		res.status(400).send(e);
	}
});

//Read
router.get('/folders', async (req, res) => {
	try {
		const folders = await Folder.find(req.query).populate('project');
		res.send(folders);
	} catch (e) {
		res.status(500).send(e);
	}
});

router.get('/folders/:id', async (req, res) => {
	try {
		const folder = await Folder.findById(req.params.id).populate('project');
		if (!folder) {
			return res.status(404).send();
		}
		res.send(folder);
	} catch(e) {
		res.status(500).send(e);
	}
});

//Update
router.patch('/folders/:id', async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['name', 'description'];
	const isValidOperation = updates.every(update => allowedUpdates.includes(update));

	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid updates!' });
	}

	try {
		const folder = await Folder.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true });
		//Options - new returns the modified object rather than the original
		if (!folder) {
			return res.status(404).send();
		}
		res.send(folder);
	} catch (e) {
		res.status(400).send(e);
	}
});


//Delete
router.delete('/folders/:id', async (req, res) => {
	try {
		const folder = await Folder.findByIdAndDelete(req.params.id);
		if (!folder) {
			return res.status(404).send();
		}
		res.send(folder);
	} catch (e) {
		res.status(500).send(e);
	}
});

module.exports = router;