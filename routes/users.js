const usersRouter = require('express').Router();
const { getUser, updateUserInfo } = require('../controllers/users');
const { getUserValidation, updateUserValidation } = require('../middlewares/validations');

usersRouter.get('/me', getUser);
usersRouter.patch('/me', updateUserValidation, updateUserInfo);

module.exports = usersRouter;
