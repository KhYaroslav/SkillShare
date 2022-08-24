const express = require('express');
const { Op } = require('sequelize');
const upload = require('../middleware/multer/multer');
const {
  Post, User, Like, Favorite, Comment,
} = require('../db/models');

const router = express.Router();

router.get('/posts', async (req, res) => {
  const posts = await Post.findAll({
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

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  await Post.increment({ view: 1 }, { where: { id } });
  const post = await Post.findOne({
    where: { id },
    include: [
      { model: User },
      { model: Like },
      { model: Favorite },
      { model: Comment },
    ],
  });
  // await Post.update({ view: post.view + 1 }, { where: { id } });// добавляем счетчик
  // res.sendStatus(200);
  res.json(post);
});

router.post('/posts', upload.single('file'), async (req, res) => {
  const post = await Post.create({
    title: req.body.title,
    description: req.body.description,
    file: req.file?.path.replace('public', ''),
    user_id: req.session.user.id,
  });
  // res.sendStatus(200);
  res.json(post);
});

router.route('/filter/posts').post(async (req, res) => {
  const { input } = req.body;
  const posts = await Post.findAll({
    where: {
      title: {
        [Op.like]: `%${input}%`,
      },
    },
  });
  res.json(posts);
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const userId = req.session.user.id;
  const findPost = await Post.findOne({ where: { id, user_id: userId } });
  const post = await findPost.update({
    title: req.body.title,
    description: req.body.description,
    file: req.file?.path.replace('public', ''),
    user_id: req.session.user.id,
  });
  // res.sendStatus(200);
  res.json(post);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const userId = req.session.user.id;
  await Like.destroy({ where: { post_id: id, user_id: userId } });
  await Favorite.destroy({ where: { post_id: id, user_id: userId } });

  await Post.destroy({
    where: {
      id,
      user_id: userId,
    },
  });
  res.sendStatus(200);
});

module.exports = router;
