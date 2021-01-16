const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'please provide project name'],
		},
		workflow: {
			type: String,
			required: [true, 'select a workflow'],
			enum: ['basic task tracking', 'support tracking'],
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
		},
		company: {
			type: mongoose.Types.ObjectId,
			ref: 'Company',
		},
		user: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
		},
		task: {
			type: mongoose.Types.ObjectId,
			ref: 'Task',
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);
module.exports = mongoose.model('ProjectModel', ProjectSchema);
