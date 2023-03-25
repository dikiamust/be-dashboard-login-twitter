const express = require('express');
const logger = require('./utils/logger');
const env = require('dotenv').config();
const cors = require('cors');
const connectDB = require('./database/mongo.config');
const errorHandler = require('./middlewares/error.handler');
const indexRouter = require('./modules/index.route');
const cookieSession = require('cookie-session')
const passport = require('passport');

const app = express();

const corsOptions = { origin: process.env.BASE_CLIENT_URL };
app.use(cors(corsOptions));

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  logger.info(`Request: ${req.method} ${req.url}`);

  res.on('finish', () => {
    logger.info(`Response: status code : ${res.statusCode}`);
  });

  next();
});


app.use(indexRouter);

app.use(cookieSession({
  name: 'twitter-auth-session',
  keys: ['key1', 'key2']
}))
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/error', (req, res) => res.send('Unknown Error'))
app.get('/auth/twitter',passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/auth/error' }),
  (req, res) => {
    res.redirect('/');
});


app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen( port, () => {
  logger.info(`app (${process.env.NODE_ENV}) is running on http://localhost:${port}`)
});
