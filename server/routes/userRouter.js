require('dotenv').config();
const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

router.route('/').get(async (req, res) => {
  res.json({});
});

router.route('/signin').post(async (req, res) => {
  const { name, password } = req.body;
  if (name && password) {
    try {
      const user = await User.findOne({
        where: {
          name,
        },
      });
      if (user && (await bcrypt.compare(password, user.password))) {
        req.session.user = { id: user.id, name: user.name };
        return res.json({ id: user.id, name: user.name });
      }
      return res.sendStatus(401);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  }
  return res.sendStatus(200);
});

router.route('/signup').post(async (req, res) => {
  const { name, email, password } = req.body;
  if (name && email && password) {
    const pass = await bcrypt.hash(password, 10);
    try {
      const newUser = await User.create({ name, email, password: pass });
      req.session.user = { name: newUser.name, id: newUser.id };
      return res.json({ name: newUser.name, id: newUser.id }).sendStatus(222);
    } catch (err) {
      console.log(err);
      return res.sendStatus(401);
    }
  }
  return res.sendStatus(401);
});

router.route('/check').post((req, res) => {
  if (req.session.user) {
    return res.json(req.session.user);
  }
  return res.sendStatus(401);
});

router.route('/logout').get((req, res) => {
  res.app.locals.ws.delete(req.session.user.id);
  for (const [, wsClient] of res.app.locals.ws) {
    wsClient.ws.send(
      JSON.stringify({
        type: 'ADD_CHAT_USER',
        payload: Array.from(res.app.locals.ws.values()).map((el) => el.user),
      }),
    );
  }
  req.session.destroy();
  res.clearCookie(process.env.SESSION_NAME).sendStatus(200);
});

module.exports = router;
