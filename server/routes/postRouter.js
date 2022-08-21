const express = require('express');
const upload = require('../middleware/multer/multer');
const { Post } = require('../db/models');

const router = express.Router();

router.post('/posts', upload.single('file'), async (req, res) => {
  // console.log('req.file---->', req.file);
  // console.log('req.body---->', req.body);
  await Post.create({ title: req.body.title, description: req.body.description, file: req.file?.path.replace('public', '') });
  const posts = await Post.findAll();
  // res.sendStatus(200);
  res.json(posts);
});

module.exports = router;
