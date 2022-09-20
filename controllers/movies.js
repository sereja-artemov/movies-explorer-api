const moviesModel = require('../models/movie');
const ValidationError = require('../error/ValidationError');
const ConflictError = require('../error/ConflictError');
const NotFoundError = require('../error/NotFoundError');
const errCode = require("../const");
const ForbiddenError = require("../error/ForbiddenError");

const getUserMovies = (req, res, next) => {
  moviesModel.find({})
    .then((movies) => {
      if (!movies) {
        throw next(new NotFoundError('Файлы не найдены'))
      }
      res.send(movies);
    })
    .catch(next);
}

const createMovie = (req, res, next) => {
  const { country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId } = req.body;
  moviesModel.create({country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId, owner: req.user._id})
    .then((movie) => res.send(movie))
    .catch(next);
}

const removeMovie = (req, res, next) => {
  moviesModel.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм не найден');
      } else if (movie.owner._id.toString() !== req.user._id.toString()) {
        throw new ForbiddenError('Нельзя удалить чужой фильм');
      }
      movie.remove();
      res.status(200).send({ data: movie });
    })
    .catch(next);
}

module.exports = { getUserMovies, createMovie, removeMovie }
