const moviesModel = require('../models/movie');
const ValidationError = require('../error/ValidationError');
const ConflictError = require('../error/ConflictError');
const NotFound = require('../error/NotFoundError');
const errCode = require("../const");

const getUserMovies = (req, res, next) => {
  moviesModel.find({})
    .then((movies) => res.send(movies))
    .catch(next);
}

const createMovie = (req, res, next) => {
  const { country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId } = req.body;
  moviesModel.create({country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId})
    .then((movie) => res.send(movie))
    .catch(next);
}

const removeMovie = (req, res, next) => {
  moviesModel.findByIdAndRemove(req.movie._id)
    .catch(next);
}

module.exports = { getUserMovies, createMovie, removeMovie }
