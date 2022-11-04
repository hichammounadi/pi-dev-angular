const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, 'provide your fullname']
  },

  // ! AUTHENTICATION

  email: {
    type: String,
    unique: true,
    required: [true, 'You need to provide your email address'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email address',
    },
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
  },

  role: {
    type: String,
    enum: process.env.USER_ROLE.split(','),
    default: process.env.USER_ROLE.split(',')[1],
  },
});
UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model('User', UserSchema);
