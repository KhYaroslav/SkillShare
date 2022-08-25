const express = require('express');
const {
  Post, User, Like, Favorite, Comment,
} = require('../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await Post.findAll({
    include: [
      { model: User },
      { model: Like },
      { model: Favorite },
      { model: Comment },
    ],
    limit: 10,
  });
  const popular = posts.sort((a, b) => b.Likes.length - a.Likes.length);
  //   res.sendStatus(200);
  res.json(popular);
});

module.exports = router;
