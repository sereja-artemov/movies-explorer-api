const moviesModel = require('../models/movie');
const NotFoundError = require('../error/NotFoundError');
const ForbiddenError = require('../error/ForbiddenError');

const getUserMovies = (req, res, next) => {
  moviesModel.find({ owner: req.user._id })
    .then((movies) => {
      if (!movies) {
        throw next(new NotFoundError('Файлы не найдены'));
      }
      res.send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  moviesModel.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch(next);
};

const removeMovie = (req, res, next) => {
  moviesModel.findById(req.params.movieId)
    .orFail(new NotFoundError('Фильм не найден'))
    .then((movie) => {
      if (movie.owner._id.toString() === req.user._id) {
        return movie.remove()
          .then(() => res.status(200).send({ message: 'Фильм удален', data: movie }));
      }
      throw next(new ForbiddenError('Нельзя удалить чужой фильм'));
    })
    .catch(next);
};

module.exports = { getUserMovies, createMovie, removeMovie };
