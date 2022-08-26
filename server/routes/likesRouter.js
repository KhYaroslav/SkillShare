const express = require('express');
const {
  Like, User, Post, Favorite, Comment,
} = require('../db/models');

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.session.user.id;
    const checkLike = await Like.findAll({
      where: {
        user_id: userId,
        post_id: id,
      },
    });
    if (checkLike.length === 0) {
      await Like.create({ user_id: req.session.user.id, post_id: id });
      const post = await Post.findOne({
        where: { id },
        include: [
          { model: User },
          { model: Like },
          { model: Comment },
          { model: Favorite },
        ],
      });
      return res.json(post);
    }
    await Like.destroy({
      where: {
        user_id: userId,
        post_id: id,
      },
    });
    const post = await Post.findOne({
      where: { id },
      include: [
        { model: User },
        { model: Like },
        { model: Comment },
        { model: Favorite },
      ],
    });
    res.json(post);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
