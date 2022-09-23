require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const error = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const NotFoundError = require('./error/NotFoundError');
const { limiter } = require('./utils/limiter');

const { PORT = 3000 } = process.env;
const app = express();

const options = {
  origin: [
    'http://localhost:3005',
    'https://movies-expl.nomoredomains.sbs',
    'http://movies-expl.nomoredomains.sbs',
    'https://sereja-artemov.github.io/',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

app.use('*', cors(options));
app.use(requestLogger);
app.use(helmet());
app.use(limiter);

mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
})
  .then(() => {
    console.log(`Connected to MongoDB!!! Порт ${PORT}`);
  })
  .catch(() => {
    console.log('Упс, что-то сломалось!');
  });

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

app.use(require('./routes/auth'));

app.use(auth);

app.use(require('./routes/users'));
app.use(require('./routes/movies'));

app.use(errorLogger);
app.use('*', () => {
  throw new NotFoundError('Страница не найдена');
});

app.use(errors());
app.use(error);

app.listen(PORT);
