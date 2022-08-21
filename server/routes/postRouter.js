const express = require('express');
const upload = require('../middleware/multer/multer');
const { Post, User } = require('../db/models');

const router = express.Router();

router.get('/posts', async (req, res) => {
  const posts = await Post.findAll({ include: { model: User } });
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

module.exports = router;
