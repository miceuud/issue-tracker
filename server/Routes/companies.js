const express = require('express');
const router = express.Router();

// import routes
const {
	listCompanies,
	listCompany,
	createCompany,
	updateCompany,
} = require('../Controllers/company');

router.route('/').get(listCompanies).post(createCompany);

router.route('/:id').get(listCompany).put(updateCompany);

module.exports = router;
 