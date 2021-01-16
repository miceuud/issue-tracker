require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Company = require('./Models/Company');

const com = JSON.parse(fs.readFileSync(
	path.join(__dirname, 'data/companies.json'),
	'utf-8'
));

async function connectDB() {
	try {
		const connect = await mongoose.connect(
			process.env.MONGODB_CONNECTION_STRING,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}
		);

		if (connect) {
			await Company.create(com);
			console.log('database seeded');
			process.exit();
		}
	} catch (error) {
		console.error(error.message);
	}
}

async function purgeDB() {
	try {
		const connect = await mongoose.connect(
			process.env.MONGODB_CONNECTION_STRING,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}
		);
		if (connect) {
			await Company.deleteMany();
			console.log('database purged');
			process.exit();
		}
	} catch (error) {
		console.error(error.message);
		process.exit()
	}
}

if(process.argv[2] === '-i') {
	connectDB()
} else {
	purgeDB()	
}

