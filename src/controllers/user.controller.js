const { UserModel } = require('../models/user.model');

async function updateUser(req, res, next) {
  try {
    const { id } = req.params;
    const updateDetails = req.body;
  
    const user = await userModel.findOneAndUpdate(id, updateDetails, {
      new: true,
    });

  return res.json({
    status: true,
    user,
  });
  } catch(error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;

    const user = await userModel.deleteOne({ _id: id });
  
    return res.json({
      status: true,
      user,
    });
  } catch(error) {
    next(error);
  }
}

module.exports = {
  updateUser,
  deleteUser
}
