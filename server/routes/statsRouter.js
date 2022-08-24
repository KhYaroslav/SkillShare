const express = require('express');
const {
  Post, User, Like, Favorite, Comment,
} = require('../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await Post.findOne({
    where: {
      user_id: req.session.user.id,
    },
    include: [
      { model: User },
      { model: Like },
      { model: Favorite },
      { model: Comment },
    ],
  });
  // res.sendStatus(200);
  res.json(posts);
});

module.exports = router;
