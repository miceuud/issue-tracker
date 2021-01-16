const mongoose = require('mongoose');
const slugify = require('slugify');

const CompanySchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'please create a company'],
	},
	address: {
		type: String,
		required: [true, 'please provide an address'],
	},
	slug: {
		type: String,
	},
	phoneNumber: {
		type: String,
		required: [true, 'please provide a valid number'],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

CompanySchema.pre('save', function (next) {
	this.slug = slugify(this.name);
	next();
});
module.exports = mongoose.model('CompanyModel', CompanySchema);
