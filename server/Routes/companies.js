const express = require('express');
const router = express.Router();
const { protectRoutes } = require('../Middleware/protect');

// import routes
const {
	listCompanies,
	listCompany,
	createCompany,
	updateCompany,
} = require('../Controllers/company');

router.use(protectRoutes);

router.route('/').get(listCompanies).post(createCompany);

router.route('/:id').get(listCompany).put(updateCompany);

module.exports = router;   
