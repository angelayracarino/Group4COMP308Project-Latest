// Load the module dependencies
const config = require('./config');
const mongoose = require('mongoose');

// Define the Mongoose configuration method
module.exports = function() {
	// Use Mongoose to connect to MongoDB
	const db = mongoose.connect(config.db).then(() => console.log('DB Connected!'))
		.catch(err => {
		console.log('Error in db connection', err);
		});

	// Load the 'User' model 
	require('../models/User');
	// Load the 'Alert' model 
	//require('../models/Alert');

	// Return the Mongoose connection instance
	return db;
};