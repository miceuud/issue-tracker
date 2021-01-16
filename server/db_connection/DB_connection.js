require('dotenv').config();
const mongoose = require('mongoose');

const connectDb = async function () {
	try {
		const connect = await mongoose.connect(
			process.env.MONGODB_CONNECTION_STRING,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true,
				useFindAndModify: false,
			}
		);
		if (connect) console.log('DB connection established');
	} catch (error) {
		console.error(error.message);
	}
};

module.exports = connectDb;
