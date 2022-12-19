const express = require('express');
const passport = require('passport');
const authController = require('../controllers/auth.controller');
const userValidation = require('../validators/user.validator.js');
require('dotenv').config();

const authRouter = express.Router();

authRouter.post(
  '/signup',
  userValidation,
  passport.authenticate('signup', { session: false }),
  authController.signup,
);

authRouter.post(
  '/login',
  authController.login,
);

module.exports = authRouter;
