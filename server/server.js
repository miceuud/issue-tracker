require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const connectDb = require('./db_connection/DB_connection');
const company = require('./Routes/companies');
const user = require('./Routes/user');
const auth = require('./Routes/auth');
const project = require('./Routes/projects');
const { errorHandler } = require('./util/errorHandler');

// Connect to DB
connectDb();

// initialize server   
const app = express();

// BodyParser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// parse cookie
app.use(cookieParser());

// import routes
app.use('/api/v1/companies', company);
app.use('/api/v1/users', user);
app.use('/api/v1/auth', auth);
app.use('/api/v1/projects', project);

app.get('/', (req, res) => {
	res.status(200).json({
		status: 'success',
		message: 'connection established',
	});
});

app.use(errorHandler);

app.listen(8800, console.log('connected to server'));

// Handle unhandled promise rejections
// process.on('unhandledRejection', (err, promise) => {
// 	console.log(`Error: ${err.message}`);
// 	// Close server & exit process
// 	process.exit(1);
// });
