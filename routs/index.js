const router = require('express').Router();
const { signinValidation, signupValidation } = require('../middlewares/validations');
const { login, createUser } = require('../controllers/users');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');

router.post('/signup', signupValidation, createUser);
router.post('/signin', signinValidation, login);

router.use(auth);

router.use(usersRouter);
router.use(moviesRouter);

module.exports = router;
