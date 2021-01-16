const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
	fullname: {
		type: String,
		required: [true, 'please provide project name'],
	},
	role: {
		type: String,
		enum: ['owner', 'admin', 'user'],
		default: 'owner',
	},
	password: {
		type: String,
		required: [true, 'please enter a password'],
		select: false,
	},
	email: {
		type: String,
		required: [true, 'please enter an email'],
		index: true,
	},
	project_assigned: {
		type: String
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date,
	createAt: {
		type: Date,
		default: Date.now,
	},
	company: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Company',
	},
});

UserSchema.index({ email: 1 }, { unique: 1 });

UserSchema.pre('save', function (next) {
	const salt = bcrypt.genSaltSync(10);
	this.password = bcrypt.hashSync(this.password, salt);
	next();
});

UserSchema.methods.matchPassword = function (pwd) {
	return bcrypt.compare(pwd, this.password);
};

module.exports = mongoose.model('UserModel', UserSchema);
