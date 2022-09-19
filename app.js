const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const { login, createUser } = require("./controllers/users");
const auth = require('./middlewares/auth')
const { signupValidation, signinValidation } = require("./middlewares/validations");

const { PORT = 3000 } = process.env;
const app = express();

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
}, (err) => {
  if (err) throw err;
  // eslint-disable-next-line no-console
  console.log('Connected to MongoDB!!!');
});

app.use(requestLogger);
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

app.post('/signup', signupValidation, createUser);
app.post('/signin', signinValidation, login);

app.use(auth);

app.use('/users', usersRouter);
app.use('/movies', moviesRouter);
app.use('*', (req, res) => {
  try {
    throw new NotFoundError('Страница не найдена');
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(errCode.NotFoundError).send({ message: err.message });
    }
  }
});

app.use(errorLogger);

app.listen(PORT);
