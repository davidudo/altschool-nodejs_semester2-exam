const express = require('express');
const passport = require('passport');
const userController = require('../controllers/user.controller');

const userRouter = express.Router();

userRouter.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  userController.deleteUser,
);

userRouter.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  userController.updateUser,
);

module.exports = userRouter;
