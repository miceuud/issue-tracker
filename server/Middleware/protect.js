const jwt = require('jsonwebtoken')
const User = require('../Models/User')

exports.protectRoutes = async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1];
	}

	if (!token)
		return res.status(401).json({
			status: false,
			message: 'Not authorised to access this route',
		});

	try {
		const decode = jwt.verify(token, process.env.JWT_SECRET);

		// set the current logged in user
		req.user = await User.findById(decode.id);
		console.log(req.user)

		next();
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			status: false,
			message: 'something went wrong',
		});
	}
};
