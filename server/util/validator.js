const Joi = require('joi');

const joiSchema = Joi.object().keys({
  fullname: Joi.string().min(3).max(25),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  email: Joi.string().email({
  	minDomainSegments: 2,
  }),
});


module.exports = joiSchema