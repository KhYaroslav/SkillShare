require('dotenv').config();
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cors = require('cors');

const http = require('http');
const wss = require('./webSocket');

const PORT = process.env.PORT || 3001;

const app = express();
app.locals.ws = new Map();

const userRouter = require('./routes/userRouter');
const newsRouter = require('./routes/newsRouter');
const postRouter = require('./routes/postRouter');
const likeRouter = require('./routes/likesRouter');
const favoriteRouter = require('./routes/favoriteRouter');
const commentRouter = require('./routes/commentRouter');
const statsRouter = require('./routes/statsRouter');
const popularRouter = require('./routes/popularRouter');
const newRouter = require('./routes/newRouter');
const questionRouter = require('./routes/questionRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(
  cors({
    credentials: true,
    origin: true,
  }),
);

const sessionParser = session({
  name: process.env.SESSION_NAME,
  store: new FileStore(),
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: {
    expires: 24 * 60 * 60e3,
    httpOnly: true,
  },
});

app.use(sessionParser);

app.use('/api/user', userRouter);
app.use('/news', newsRouter);
app.use('/api/post', postRouter);
app.use('/api/likes', likeRouter);
app.use('/api/favorites', favoriteRouter);
app.use('/api/popular', popularRouter);
app.use('/api/comment', commentRouter);
app.use('/api/stats', statsRouter);
app.use('/api/new', newRouter);
app.use('/api/question', questionRouter);

const server = http.createServer(app);

server.on('upgrade', (request, socket, head) => {
  console.log('Parsing session from request...', app.locals.ws);

  sessionParser(request, {}, () => {
    if (!request.session.user) {
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      return;
    }
    console.log('Session is parsed!');
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request, app.locals.ws);
    });
  });
});

server.listen(PORT, () => {
  console.log('server start on port ', PORT);
});
