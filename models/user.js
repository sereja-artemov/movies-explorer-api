const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Некорректный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    default: '',
  },
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  }
})

module.exports = mongoose.model('user', userSchema);
