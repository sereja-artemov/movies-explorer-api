const usersRouter = require('express').Router();
const { getUser, updateUserInfo } = require('../controllers/users');
const { updateUserValidation } = require('../middlewares/validations');

usersRouter.get('/users/me', getUser);
usersRouter.patch('/users/me', updateUserValidation, updateUserInfo);

module.exports = usersRouter;
