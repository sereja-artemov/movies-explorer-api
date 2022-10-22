const moviesRouter = require('express').Router();
const { getUserMovies, createMovie, removeMovie } = require('../controllers/movies');
const { createMovieValidation, removeMovieValidation } = require('../middlewares/validations');

moviesRouter.get('/movies', getUserMovies);
moviesRouter.post('/movies', createMovieValidation, createMovie);
moviesRouter.delete('/movies/:movieId', removeMovie);

module.exports = moviesRouter;
