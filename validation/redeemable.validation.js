var Joi = require('joi');

// module.exports.user = Joi.object().keys({
//   email: Joi.string().email().required(),
//   password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
//   domain: Joi.string().hostname().min(3).max(30).required()
// });

module.exports.code_gen = Joi.string().min(7).max(7);
