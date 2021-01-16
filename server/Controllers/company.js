const Company = require('../Models/Company');

// @desc     List all companies
// @route    GET api/v1/companies
// @mode     PRIVATE/admin
exports.listCompanies = async (req, res) => {
	try {
		const company = await Company.find();
		// console.log(typeof company[0].id)
		if (company) res.status(200).json({ status: 'successful', data: company });
	} catch (error) {
		console.log(error.message);
		res.status(400).json({ status: 'failed', message: error.message });
	}
};

// @desc     List a company
// @route    GET api/v1/companies/:id
// @mode     PRIVATE/admin
exports.listCompany = async (req, res) => {
	try {
		const company = await Company.findById(req.params.id);
		if (company) res.status(200).json({ status: 'successful', data: company });
	} catch (error) {
		// throw error
		console.log(error.message);
		res.status(400).json({ status: 'failed', message: error.message });
	}
};

// @desc     Create a company
// @route    POST api/v1/companies/
// @mode     PRIVATE/admin
exports.createCompany = async (req, res) => {
	const query = req.body;
	try {
		let company = await Company.find();

		// only one company allowed for now
		if (!company.length) {
			company = await Company.create(query);

			if (company)
				res.status(201).json({ status: 'successful', data: company });
		} else {
			return res
				.status(403)
				.json({ status: 'failed', message: 'you can only create one company' });
		}
	} catch (error) {
		console.log(error.message);
		return res.status(400).json({ status: 'failed', message: error.message });
	}

	// try {
	// 	// one one company for now
	// 	if (company)
	// 		return res
	// 			.status(403)
	// 			.json({ status: 'failed', message: 'you can only create one company' });

	// 	company = await Company.create(query);
	// 	if(!company) throw error
	// 	res.status(200).json({ status: 'successful', data: company });
	// } catch (error) {
	// 	console.log(error);
	// 	res.status(400).json({ status: 'failed', message: error.message });
	// }
	// only one company allowed
};

// @desc     Edit a company
// @route    PUT api/v1/companies/:id
// @mode     PRIVATE/admin
exports.updateCompany = async (req, res) => {
	try {
		let company = await Company.findById(req.params.id);

		if (company)
			company = await Company.findByIdAndUpdate(req.params.id, req.body, {
				runValidators: true,
				returnOriginal: false,
			});
		res.status(201).json({
			status: 'successful',
			data: company,
		});
	} catch (error) {
		return res.status(400).json({
			status: 'failed',
			data: error.message,
		});
	}
};

