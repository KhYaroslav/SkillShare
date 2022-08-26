const express = require('express');
const {
  Comment,
} = require('../db/models');

const router = express.Router();

router.post('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { input } = req.body;
    const userId = req.session.user.id;
    const comment = await Comment.create({
      user_id: userId, post_id: id, comment_desc: input,
    });
    res.json(comment);
  } catch (error) {
    console.log(error);
  }
});
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.session.user.id;
    const findComment = await Comment.findOne({
      where: { id, user_id: userId },
    });
    const comment = await findComment.update({
      user_id: userId, post_id: id, comment_desc,
    });
    res.json(comment);
  } catch (error) {
    console.log(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.session.user.id;
    await Comment.destroy({
      where: {
        id,
        user_id: userId,
      },
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
