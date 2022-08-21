const express = require('express');
const { Like } = require('../db/models');

const router = express.Router();

router.get('/:id', async (req, res) => {
  console.log('req.params--->', req.params);
  const { id } = req.params;
  const userId = req.session.user.id;
  const checkLike = await Like.findAll({
    where: {
      user_id: userId,
      post_id: id,
    },
  });
  console.log('checkLike---->', checkLike);
  if (checkLike.length == 0) { await Like.create({ user_id: req.session.user.id, post_id: id }); } else {
    await Like.destroy({
      where: {
        user_id: userId,
        post_id: id,
      },
    });
  }

  res.sendStatus(200);
});

module.exports = router;
