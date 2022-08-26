const express = require('express');
const {
  Post, User, Like, Favorite, Comment,
} = require('../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
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
    res.json(posts);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
