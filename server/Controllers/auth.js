const User = require('../Models/User');
const joiSchema = require('../util/validator');
const bcrypt = require('bcryptjs');

// @desc     register a user
// @route    POST api/v1/auth/register
// @mode     PUBLIC
exports.register = async (req, res) => {
	const { fullname, password, email } = req.body;

	try {
		// validate inputs
		const value = await joiSchema.validateAsync(
			{
				fullname,
				password,
				email,
			},
			{ presence: 'required' }
		);

		if (value) {
			// check if its in the database
			let user = await User.findOne({ email });
			if (!user) {
				user = await User.create({ fullname, password, email });
			 	return res.status(201).json({
					status: 'successful',
					data: user,
				});
			}
			return res.status(400).json({
				status: 'failed',
				message: 'user already exist',
			});
		}
	} catch (error) {
		console.log(error.message);
		return res.status(400).json({
			status: 'failed',
			data: error.message,
		});
	}
};

// @desc     login user
// @route    POST api/v1/auth/login
// @mode     PUBLIC
exports.login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email }).select('+password');

		if (user) {
			let pwd = await user.matchPassword(password);

			if (pwd) {
				return res.status(200).json({
					status: 'successful',
					message: 'login successful',
				});
			}
			return res.status(200).json({
				status: 'failed',
				message: 'username and password is not correct',
			});
		}
		// come bac and chec this 

		throw new Error();
	} catch (error) {
		console.log(error);
		res.status(400).json({
			status: 'failed',
			message: error,
		});
	}
};
