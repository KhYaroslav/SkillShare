const express = require('express');
const upload = require('../middleware/multer/multer');
const {
  Post, User, Like, Favorite,
} = require('../db/models');

const router = express.Router();

router.get('/posts', async (req, res) => {
  const posts = await Post.findAll({
    include: [
      { model: User },
      { model: Like },
      { model: Favorite },
    ],
  });
  // res.sendStatus(200);
  res.json(posts);
});

router.post('/posts', upload.single('file'), async (req, res) => {
  // console.log('req.file---->', req.file);
  // console.log('req.body---->', req.body);
  const post = await Post.create({
    title: req.body.title, description: req.body.description, file: req.file?.path.replace('public', ''), user_id: req.session.user.id,
  });
  // res.sendStatus(200);
  res.json(post);
});
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const userId = req.session.user.id;
  const findPost = await Post.findOne({ where: { id, user_id: userId } });
  const post = await findPost.update({
    title: req.body.title, description: req.body.description, file: req.file?.path.replace('public', ''), user_id: req.session.user.id,
  });
  // res.sendStatus(200);
  res.json(post);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const userId = req.session.user.id;
  await Post.destroy({
    where: {
      id,
      user_id: userId,
    },
  });
  res.sendStatus(200);
});

module.exports = router;
