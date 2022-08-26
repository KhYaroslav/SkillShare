const express = require('express');
const {
  Post, User, Like, Favorite, Comment,
} = require('../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        { model: User },
        { model: Like },
        { model: Favorite },
        { model: Comment },
      ],
    });
    const popular = posts.sort((a, b) => b.Likes.length - a.Likes.length);
    //   res.sendStatus(200);
    res.json(popular);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
