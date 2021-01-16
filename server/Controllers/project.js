const Project = require('../Models/Project');

// @desc     Fetch all projects
// @route    POST api/v1/auth/register
// @mode     PUBLIC
exports.getProjects = async (req, res) => {
	try {
		const project = await Project.find();
		if (project) {
			res.status(200).json({
				status: 'successful',
				count: project.length,
				data: project,
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

// @desc     Fetch a Projects
// @route    POST api/v1/projects/:id
// @mode     PRIVATE
exports.getProject = async (req, res) => {
	const query = req.params.id;
	try {
		const project = await Project.findById(query);
		if (project) {
			res.status(200).json({
				status: 'successful',
				data: project,
			});
		}
		return res.status(400).json({
			status: 'failed',
			message: "the given pproject not isn't found",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			status: 'failed',
			message: 'something went wrong, please try again',
		});
	}
};
// @desc     Creat a Projects
// @route    POST api/v1/projects/
// @mode     PRIVATE
exports.createProject = async (req, res) => {
	try {
		const project = await Project.create(req.body);
		if (project) {
			res.status(200).json({
				status: 'successful',
				data: project,
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			status: 'failed',
			message: error.message,
		});
	}
};

// @desc     Creat a Projects
// @route    POST api/v1/projects/
// @mode     PRIVATE
exports.updateProject = async (req, res) => {
	const query = req.body;

	try {
		let project = await Project.findById(req.params.id);
		if (project) {
			project = await Project.findByIdAndUpdate(req.params.id, query, {
				runValidators: true,
				returnOriginal: false,
			});

			res.status(200).json({
				status: 'successful',
				data: project,
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

// @desc     Creat a Projects
// @route    POST api/v1/projects/
// @mode     PRIVATE
exports.deleteProject = async (req, res) => {
	try {
		let project = await Project.findByIdAndDelete(req.params.id);
		if (project) {
			res.status(200).json({
				status: 'successful',
				message: 'project deleted',
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
