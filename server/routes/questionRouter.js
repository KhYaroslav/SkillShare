const express = require('express');
const {
  User, Question,
} = require('../db/models');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const question = await Question.create({
      title: req.body.title,
      description: req.body.description,
      user_id: req.session.user.id,
    });
    res.json(question);
  } catch (error) {
    console.log(error);
    console.log('here error!');
  }

  // res.sendStatus(200);
});

router.get('/all', async (req, res) => {
  ('here--------------------------->!!!!');

  try {
    const questions = await Question.findAll({
      include: [
        { model: User },
      ],
    });
    // res.sendStatus(200);
    console.log('questions------>', questions);
    res.json(questions);
  } catch (error) {
    console.log('sdfhsgdhhsdgsdhshdgsd');

    res.sendStatus(402);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const question = await Question.findOne({
      where: { id },
      include: [
        { model: User },
      ],
    });

    res.json(question);
  } catch (error) {
    console.log('here mistake!', error);
  }

  // await Post.update({ view: post.view + 1 }, { where: { id } });// добавляем счетчик
  // res.sendStatus(200);
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
  try {
    await Question.destroy({
      where: {
        id,
        user_id: userId,
      },
    });
    res.sendStatus(200);
  } catch (error) {
    console.log('error here', error);
  }
});

module.exports = router;
