const moviesRouter = require('express').Router();
const { getUserMovies, createMovie, removeMovie } = require('../controllers/movies');
const { createMovieValidation } = require('../middlewares/validations');

moviesRouter.get('/movies', getUserMovies);
moviesRouter.post('/movies', createMovieValidation, createMovie);
moviesRouter.delete('/movies/:_id', removeMovie);

module.exports = moviesRouter;
