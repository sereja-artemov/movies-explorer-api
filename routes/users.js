const usersRouter = require('express').Router();
const { getUser, updateUserInfo} = require("../controllers/users");
const {getUserValidation} = require("../middlewares/validations");

usersRouter.get('/me', getUserValidation, getUser);
usersRouter.patch('/me', updateUserValidation, updateUserInfo);

module.exports = usersRouter;
