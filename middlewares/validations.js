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
  }),
});

const signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const getUserValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
});

const updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().max(150),
    director: Joi.string().required().max(150),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().custom(checkValidUrl).required(),
    trailerLink: Joi.string().custom(checkValidUrl).required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().custom(checkValidUrl).required(),
    movieId: Joi.number().required(),
  }),
});

// const removeMovieValidation = celebrate({
//   params: Joi.object().keys({
//     movieId: Joi.string().alphanum().hex().length(24)
//       .required(),
//   }),
// });

module.exports = {
  signupValidation,
  signinValidation,
  getUserValidation,
  updateUserValidation,
  createMovieValidation,
};
