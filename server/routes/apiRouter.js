const express = require('express');
require('dotenv').config();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

const router = express.Router();

router.post('/check', async (req, res) => {
  if (req.session.user_id) {
    return res.json({
      id: req.session.user_id,
      username: req.session.username,
    });
  }
  res.sendStatus(401);
});

router.post('/signup', async (req, res) => {
  console.log(req.body);
  const hashpass = await bcrypt.hash(req.body.password, 10);
  const [currentUser, created] = await User.findOrCreate({
    where: { username: req.body.username },
    defaults: {
      password: hashpass,
      email: req.body.email,
    },
  });
  if (!created) {
    return res.sendStatus(500);
  }
  const sessionData = {
    username: currentUser.username,
    email: currentUser.email,
    id: currentUser.id,
  };
  req.session.user_id = currentUser.id;
  req.session.username = currentUser.username;
  req.session.email = currentUser.email;
  return res.json(sessionData);
});

router.post('/login', async (req, res) => {
  const dbUser = await User.findOne({
    where: {
      username: req.body.username,
    },
  });
  if (dbUser && (await bcrypt.compare(req.body.password, dbUser.password))) {
    const sessionData = {
      username: dbUser.username,
      email: dbUser.email,
      id: dbUser.id,
    };
    req.session.user_id = dbUser.id;
    req.session.username = dbUser.username;
    req.session.email = dbUser.email;
    res.json(sessionData);
  } else res.sendStatus(401);
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie(process.env.SESSION_NAME ?? 'yeah');
  res.sendStatus(200);
});

module.exports = router;
