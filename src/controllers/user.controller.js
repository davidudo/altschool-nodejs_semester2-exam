/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');
const UserModel = require('../models/user.model');

async function updateUser(req, res, next) {
  try {
    const { id } = req.params;

    if (id) {
      const updateDetails = req.body;

      const userId = { _id: id };

      if (updateDetails.password) {
        const { password } = updateDetails;

        const hash = await bcrypt.hash(password, 10);
        updateDetails.password = hash;
      }

      const user = await UserModel.findOneAndUpdate(userId, updateDetails, {
        new: true,
      });

      return res.status(201).json({
        status: true,
        user,
      });
    }
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;

    if (id) {
      const user = await UserModel.deleteOne({ _id: id });

      return res.json({
        status: true,
        user,
      });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  updateUser,
  deleteUser,
};
