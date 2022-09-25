const authRouter = require('express').Router();
const { signupValidation, signinValidation } = require('../middlewares/validations');
const { createUser, login } = require('../controllers/users');

authRouter.post('/signup', signupValidation, createUser);
authRouter.post('/signin', signinValidation, login);

module.exports = authRouter;
