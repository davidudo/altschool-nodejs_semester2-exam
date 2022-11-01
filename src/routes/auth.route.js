const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const authController = require('../controllers/auth.controller');
require('dotenv').config();

const authRouter = express.Router();

authRouter.post(
  '/signup', 
  passport.authenticate('signup', { session: false }), 
  authController.signup
);

authRouter.post(
  '/login',
  authController.login
);

module.exports = authRouter;
