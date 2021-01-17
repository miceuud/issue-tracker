const Task = require('../Models/Task');

// @desc     Fetch all tasks
// @route    GET api/v1/tasks
// @mode     PRIVATE
exports.getTasks = async (req, res) => {
	try {
		const task = await Task.find();
		if (task) {
			res.status(200).json({
				status: 'successful',
				count: task.length,
				data: task,
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			status: 'failed',
			message: 'something went wrong, please try again',
		});
	}
};

// @desc     Fetch a task
// @route    GET api/v1/task/:taskId
// @mode     PRIVATE
exports.getTask = async (req, res) => {
	try {
		const task = await Task.findById(req.params.id);
		if (task) {
			res.status(200).json({
				status: 'successful',
				data: task,
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			status: 'failed',
			message: 'something went wrong, please try again',
		});
	}
};

// @desc     CREATE  a Task
// @route    POST api/v1/task
// @mode     PRIVATE
exports.createTask = async (req, res) => {
	try {
		const task = await Task.create(req.body);
		if (task) {
			res.status(200).json({
				status: 'successful',
				data: task,
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			status: 'failed',
			message: 'something went wrong, please try again',
		});
	}
};

// @desc     UPDATE a Task
// @route    PUT api/v1/task/:taskId
// @mode     PRIVATE
exports.updateTask = async (req, res) => {
	const query = req.body;
	try {
		let task = await Task.findById(req.params.id);

		if (task) {
			task = await Task.findByIdAndUpdate(req.params.id, query, query, {
				runValidators: true,
				returnOriginal: false,
			});
			res.status(200).json({
				status: 'successful',
				data: task,
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			status: 'failed',
			message: 'something went wrong, please try again',
		});
	}
};

// @desc     DELETE a Task
// @route    DELETE api/v1/task/:taskId
// @mode     PRIVATE
exports.deleteTask = async (req, res) => {
	try {
		let project = await Task.findByIdAndDelete(req.params.id);
		if (project) {
			res.status(200).json({
				status: 'successful',
				message: 'project deleted',
			});
		}
	} catch (error) {
		res.status(500).json({
			status: 'failed',
			message: 'something went wrong, please try again',
		});
	}
};
