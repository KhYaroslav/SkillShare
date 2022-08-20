require('dotenv').config();
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cors = require('cors');
// ws part
const http = require('http');
const wss = require('./webSocket');

<<<<<<< HEAD
const authUser = require('./middleware/middleware');
const apiRouter = require('./routes/postRouter');
const newsRouter = require('./routes/newsRouter');

const PORT = process.env.PORT ?? 3001;
=======
const PORT = process.env.PORT || 3001;
>>>>>>> 459faeb8e3477662d0f6616de93da9cd4cb5659c

const app = express();
app.locals.ws = new Map();

const userRouter = require('./routes/userRouter');
const newsRouter = require('./routes/newsRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: true,
  }),
);

const sessionParser = session({
  name: process.env.SESSION_NAME,
  store: new FileStore({}),
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: {
    expires: 24 * 60 * 60e3,
    httpOnly: true,
  },
<<<<<<< HEAD
};
app.use(express.static('public'));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionConfig));
app.use(authUser);

app.use('/api/v1', apiRouter);
app.use('/api/post', apiRouter);
=======
});

app.use(sessionParser);

app.use('/api/user', userRouter);
>>>>>>> 459faeb8e3477662d0f6616de93da9cd4cb5659c
app.use('/news', newsRouter);

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
