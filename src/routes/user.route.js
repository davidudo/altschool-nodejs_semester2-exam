const express = require('express');
const userController = require('../controllers/user.controller');

const userRouter = express.Router();

userRouter.delete('/:id', userController.deleteUser);
userRouter.put('/:id', userController.updateUser);

module.exports = userRouter;
