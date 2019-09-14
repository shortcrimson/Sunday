const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Task = mongoose.model('Task', {
	description: {
		type: 'string',
		required: true,
		trim: true
	},
	task_type: {
		type: 'string',
		trim: true,
		default: 'note',
		validate(value) {
			var taskTypes = ['note', 'enhancement', 'defect'];
			if (!taskTypes.includes(value)) {
				throw new Error('Invalid task type! Accepted types - ' + taskTypes);
			}
		}
	},
	priority: {
		type: 'number',
		default: 3,
		validate(value) {
			if (value < 1 || value > 5) {
				throw new Error('Priority must be a whole number between 1 and 5!');
			}
		}
	},
	folder: {
		type: Schema.Types.ObjectId,
		ref: 'Folder'
	}
});

module.exports = Task;