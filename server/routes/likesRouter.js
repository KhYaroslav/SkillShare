const express = require('express');
const { Like, User, Post } = require('../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
  const allLikes = await Like.findAll();
  res.json(allLikes);
});
router.get('/:id', async (req, res) => {
  // console.log('req.params--->', req.params);
  const { id } = req.params;
  const userId = req.session.user.id;
  const checkLike = await Like.findAll({
    where: {
      user_id: userId,
      post_id: id,
    },
  });
  // console.log('checkLike---->', checkLike);
  if (checkLike.length === 0) {
    await Like.create({ user_id: req.session.user.id, post_id: id });
    const post = await Post.findOne({
      where: { id },
      include: [
        { model: User },
        { model: Like },
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
    ],
  });
  res.json(post);
});

module.exports = router;
