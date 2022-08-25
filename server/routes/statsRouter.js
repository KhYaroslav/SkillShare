const express = require('express');
const {
  Post, User, Like, Favorite, Comment, Question,
} = require('../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await Post.findAll({
    where: {
      user_id: req.session.user.id,
    },
    include: [
      { model: User },
      { model: Like },
      { model: Favorite },
      { model: Comment },
      { model: Question },
    ],
  });
  res.json(posts);
});

module.exports = router;
