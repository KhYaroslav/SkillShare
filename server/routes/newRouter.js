const express = require('express');
const {
  Post, User, Like, Favorite, Comment,
} = require('../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const new10 = await Post.findAll({
      include: [
        { model: User },
        { model: Like },
        { model: Favorite },
        { model: Comment },
      ],
      order: [['createdAt', 'DESC']],
      limit: 20,
    });
    res.json(new10);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
