const moviesRouter = require('express').Router();
const {getUserMovies, createMovie, removeMovie} = require("../controllers/movies");

moviesRouter.get('/', getUserMovies);
moviesRouter.post('/', createMovie);
moviesRouter.delete('/_id', removeMovie);

module.exports = moviesRouter;
