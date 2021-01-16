const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, 'please provide title '],
		},
		proirity: {
			type: String,
			required: [true, 'select a workflow'],
			enum: ['low', 'medium', 'high'],
			default: 'low',
		},
		status: {
			type: String,
			required: [true, 'select a workflow'],
			enum: ['open', 'in progress', 'ready', 'close'],
			default: 'open',
		},
		description: String,
		createdAt: {
			type: Date,
		},
		dueDate: {
			type: Date,
		},
		user_assigned_to: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
		},
		company: {
			type: mongoose.Types.ObjectId,
			ref: 'Company',
		},
		project_bind_to: {
			type: mongoose.Types.ObjectId,
			ref: 'Project',
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);
module.exports = mongoose.model('TaskModel', TaskSchema);
