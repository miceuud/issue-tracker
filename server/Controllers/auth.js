const User = require('../Models/User');
const joiSchema = require('../util/validator');

// @desc     register a user
// @route    POST api/v1/auth/register
// @mode     PUBLIC
exports.register = async (req, res) => {
	let user;
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
			 user = await User.findOne({ email });

			if (user) {
				return res.status(400).json({
					status: 'failed',
					message: 'user already exist',
				});
			}

			user = await User.create({ fullname, password, email });

			// sign Token
			const token = user.getSignedJwtToken();

			return res.status(201).json({
				status: 'successful',
				data: user,
				token,
			});
		}
	} catch (error) {
		
		return res.status(400).json({
			status: 'failed',
			data: error,
		});
	}
};

// @desc     login user
// @route    POST api/v1/auth/login
// @mode     PUBLIC
exports.login = async (req, res) => {
	const { email, password } = req.body;
	let user;

	
	// validate inputs
	const value = await joiSchema.validateAsync(
		{
			email,
			password,
		},
		// { presence: 'required' }                                   
		);
		
		try {
			if (value) user = await User.findOne({ email }).select('+password');
			
		
		if (user) {
			let pwd = await user.matchPassword(password);

			if (!pwd) {
				return res.status(200).json({
					status: 'failed',
					message: 'username and password is not correct',
				});
			}

			// sign token
			const token = user.getSignedJwtToken();

			// send token
			const options = {
				expires: new Date(Date.now() + 30 * 24 * 60 * 60 + 1000),
				httpOnly: true,
			};

			
			return res
				.status(200)
				.cookie('token', token, options)
				.json({
					status: 'successful',
					message: 'login successful',
					token
				})
		}
		res.status(400).json({
			status: 'failed',
			message: 'user not found',
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			status: 'failed',
			message: error,
		});
	}
};
