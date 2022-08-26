const express = require('express');
const {
  Favorite, User, Post, Comment, Like,
} = require('../db/models');

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.session.user.id;
    const checkFavorite = await Favorite.findAll({
      where: {
        user_id: userId,
        post_id: id,
      },
    });
    if (checkFavorite.length === 0) {
      await Favorite.create({ user_id: req.session.user.id, post_id: id });
      const post = await Post.findOne({
        where: { id },
        include: [
          { model: User },
          { model: Favorite },
          { model: Like },
          { model: Comment },
        ],
      });
      return res.json(post);
    }
    await Favorite.destroy({
      where: {
        user_id: userId,
        post_id: id,
      },
    });
    const post = await Post.findOne({
      where: { id },
      include: [
        { model: User },
        { model: Favorite },
        { model: Like },
        { model: Comment },
      ],
    });
    res.json(post);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
