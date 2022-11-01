const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;
const { ObjectId } = Schema;

const UserSchema = new Schema({
  id: ObjectId,
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date },
});

// Hash password before saving credentials to database
UserSchema.pre(
  'save',
  async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  },
);

// Check if user is logging in with correct password
UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
