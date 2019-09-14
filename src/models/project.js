const mongoose = require('mongoose');

const Project = mongoose.model('Project', {
	name: {
		type: 'string',
		required: true,
		trim: true
	},
	description: {
		type: 'string',
		trim: true
	}
});

module.exports = Project;