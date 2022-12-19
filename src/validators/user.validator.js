const joi = require('joi');

const userValidator = joi.object({
  firstName: joi.string()
    .min(2)
    .max(255)
    .required(),
  
  lastName: joi.string()
    .min(2)
    .max(255)
    .required(),

  email: joi.string()
    .email({
      minDomainSegments: 2, tlds: {
        allow: ['com', 'net']
      }
    }),

  password: joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  
  createAt: joi.date()
    .default(Date.now())
})

const validateUserMiddleWare = async (req, res, next) => {
  const userPayload = req.body;
  try {
    await userValidator.validateAsync(userPayload);
    next();
  } catch (error) {
    console.log(error);
    return res.status(406).send(error.details[0].message);
  }
}

module.exports = validateUserMiddleWare;
