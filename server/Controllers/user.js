const User = require('../Models/User');

// @desc     Fetch all Users
// @route    POST api/v1/users/
// @mode     PRIVATE
exports.getUsers = async (req, res) => {
	try {
		const user = await User.find();
		if (user) {
			res.status(200).json({
        status: 'successful',
        count: user.length,
				data: user,
			});
		}
	} catch (error) {
    console.log(error)
    res.status(500).json({
      status: 'failed',
      message:'something went wrong, please try again '
    });
  }
	
};
