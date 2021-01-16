const express = require('express');
const router = express.Router();

// import routes
const {
	getProjects,
	getProject,
	createProject,
	updateProject,
	deleteProject,
} = require('../Controllers/project');

router.route('/').get(getProjects).post(createProject);
router.route('/:id').get(getProject).put(updateProject).delete(deleteProject);

module.exports = router;
