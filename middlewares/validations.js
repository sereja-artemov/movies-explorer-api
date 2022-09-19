const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
const ValidationError = require('../error/ValidationError');

const checkValidUrl = (url) => {
  const result = validator.isURL(url);
  if (result) {
    return url;
  }
  throw new ValidationError('Неправильный URL');
};

const signupValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  })
})

const signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  })
})

const getUserValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
});

const updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  })
})

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().max(50),
    director: Joi.string().required().max(50),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    trailerLink: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required(),
    movieId: Joi.string().required(),
  })
})

module.exports = {
  signupValidation,
  signinValidation,
  getUserValidation,
  updateUserValidation,
  createMovieValidation,
};
