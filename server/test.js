const {
  Post, User, Like, Favorite, Comment, sequelize,
} = require('./db/models');

Like.findAll({
  attributes: {
    include: [[sequelize.fn('COUNT', sequelize.col('Like.id')), 'count']],
  },
}).then((res) => console.log(JSON.parse(JSON.stringify(res))));
