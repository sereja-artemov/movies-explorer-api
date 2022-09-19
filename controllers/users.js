const userModel = require('../models/user');
const ValidationError = require('../error/ValidationError');
const ConflictError = require('../error/ConflictError');
const NotFound = require('../error/NotFoundError');
const errCode = require("../const");

const login = (req, res, next) => {
  const { email, password } = req.body;

  return userModel.findUserByCredentials(email, password)
    // eslint-disable-next-line consistent-return
    .then((user) => {
      // создаем токен
      const { NODE_ENV, JWT_SECRET } = process.env;
      const jwtToken = jsonwebtoken.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' });
      res.send({ token: jwtToken });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => userModel.create({
      name, email, password: hash,
    }))
    .then((user) => res.send({
      data: {
        name: user.name,
        email: user.email,
      },
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Такой email уже существует'));
      }
      return next(err);
    });
};

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

module.exports = { getUser, updateUserInfo, login, createUser };
