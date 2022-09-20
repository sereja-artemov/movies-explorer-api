const moviesRouter = require('express').Router();
const {getUserMovies, createMovie, removeMovie} = require("../controllers/movies");
const {createMovieValidation} = require("../middlewares/validations");

moviesRouter.get('/', getUserMovies);
moviesRouter.post('/', createMovieValidation, createMovie);
moviesRouter.delete('/:_id', removeMovie);

module.exports = moviesRouter;
