const userModel = require('../models/user');
const ValidationError = require('../error/ValidationError');
const ConflictError = require('../error/ConflictError');
const NotFound = require('../error/NotFoundError');
const errCode = require("../const");

const getUser = (req, res, next) => {
  userModel.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw next(new ValidationError('Пользователь с указанным id не найден'));
      }
      res.send(user);
    })
    .catch(next);
}

const updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;

  if (!email || !name) {
    res.status(errCode.ValidationError).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
  }

  userModel.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw next(new ValidationError('Пользователь с указанным id не найден'));
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные'));
      }
      return next(err);
    });
}

module.exports = { getUser, updateUserInfo };
