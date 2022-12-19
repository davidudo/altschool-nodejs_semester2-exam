const joi = require('joi');

const blogValidator = joi.object({
  title: joi.string()
    .min(5)
    .max(255)
    .required(),

  description: joi.string()
    .min(5)
    .max(255)
    .optional(),

  body: joi.string()
    .min(10)
    .required(),

  state: joi.string(),

  readCount: joi.number(),

  readTime: joi.number(),

  tags: joi.array()
    .optional(),

  createAt: joi.date()
    .default(Date.now()),

  updateAt: joi.date()
    .default(Date.now())
});

const validateBlogMiddleWare = async (req, res, next) => {
  const blogPayload = req.body;
  try {
    await blogValidator.validateAsync(blogPayload);
    next();
  } catch (error) {
    console.log(error);
    return res.status(406).send(error.details[0].message);
  }
}

module.exports = validateBlogMiddleWare;
