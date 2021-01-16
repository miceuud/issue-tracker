exports.errorHandler = function (err, req, res, next) {
	if (err) console.log(err.message);
	next();
};
