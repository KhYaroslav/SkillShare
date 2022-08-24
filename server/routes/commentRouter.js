const express = require('express');
const {
  Comment,
} = require('../db/models');

const router = express.Router();

router.post('/:id', async (req, res) => {
  const { id } = req.params;
  const { input } = req.body;
  const userId = req.session.user.id;
  const comment = await Comment.create({ user_id: userId, post_id: id, comment_desc: input });
  // res.sendStatus(200);
  console.log('comment----->', comment);
  res.json(comment);
});
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const userId = req.session.user.id;
  const findComment = await Comment.findOne({ where: { id, user_id: userId } });
  const comment = await findComment.update({ user_id: userId, post_id: id, comment_desc });// скорее всего ошибка в comment_desc
  // res.sendStatus(200);
  res.json(comment);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const userId = req.session.user.id;
  // await Like.destroy({ where: { post_id: id, user_id: userId } });
  // await Favorite.destroy({ where: { post_id: id, user_id: userId } });

  await Comment.destroy({
    where: {
      id,
      user_id: userId,
    },
  });
  res.sendStatus(200);
});

module.exports = router;
