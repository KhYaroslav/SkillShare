const express = require('express');
const {
  User, Question,
} = require('../db/models');

const router = express.Router();

router.post('/', async (req, res) => {
  const question = await Question.create({
    title: req.body.title,
    description: req.body.description,
    user_id: req.session.user.id,
  });
  // res.sendStatus(200);
  res.json(question);
});

router.get('/all', async (req, res) => {
  const questions = await Question.findAll({
    include: [
      { model: User },
    ],
  });
  // res.sendStatus(200);
  res.json(questions);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  await Question.increment({ view: 1 }, { where: { id } });
  const question = await Question.findOne({
    where: { id },
    include: [
      { model: User },
    ],
  });
  // await Post.update({ view: post.view + 1 }, { where: { id } });// добавляем счетчик
  // res.sendStatus(200);
  res.json(question);
});

// router.patch('/:id', async (req, res) => {
//   const { id } = req.params;
//   const userId = req.session.user.id;
//   const findPost = await Post.findOne({ where: { id, user_id: userId } });
//   const post = await findPost.update({
//     title: req.body.title,
//     description: req.body.description,
//     file: req.file?.path.replace('public', ''),
//     user_id: req.session.user.id,
//   });
//   // res.sendStatus(200);
//   res.json(post);
// });

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const userId = req.session.user.id;

  await Question.destroy({
    where: {
      id,
      user_id: userId,
    },
  });
  res.sendStatus(200);
});

module.exports = router;
