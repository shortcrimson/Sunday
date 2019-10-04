const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Folder = mongoose.model('Folder', {
	name: {
		type: 'string',
		required: true,
		trim: true
	},
	description: {
		type: 'string',
		trim: true
	},
	project: {
		type: Schema.Types.ObjectId,
		ref: 'Project'
	},
	task_count: {
		type: 'number',
		required: false,
		default: 0,
		min: 0
	}
});

module.exports = Folder;

