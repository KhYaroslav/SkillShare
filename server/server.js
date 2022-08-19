require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const authUser = require('./middleware/middleware');
const apiRouter = require('./routes/apiRouter');
const newsRouter = require('./routes/newsRouter');

const PORT = process.env.PORT ?? 3001;

const app = express();

app.use(
  cors({
    credentials: true,
    origin: true,
  }),
);

const sessionConfig = {
  name: process.env.SESSION_NAME ?? 'yeah',
  secret: process.env.SESSION_SECRET ?? 'test',
  resave: true,
  store: new FileStore(),
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: true,
  },
};

app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionConfig));
app.use(authUser);

app.use('/api/v1', apiRouter);
app.use('/news', newsRouter);

app.listen(PORT, () => {
  console.log(`App has started on port ${PORT}`);
});
