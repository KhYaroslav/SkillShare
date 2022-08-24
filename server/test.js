const {
  Post, User, Like, Favorite, Comment, sequelize,
} = require('./db/models');

Like.findAll({
  attributes: {
    include: [[sequelize.fn('COUNT', sequelize.col('Like.id')), 'count']],
  },
  // include: [
    // { model: User, attributes: [] },
    // { model: Like, attributes: [] },
  // ],
  // group: ['Like.id'],
  // order: [[sequelize.col('count'), 'DESC']],
}).then((res) => console.log(JSON.parse(JSON.stringify(res))));

// attributes: [
//   'user_id',
//   [sequelize.fn('COUNT', sequelize.col('Likes.user_id')), 'count'],

// ],
// include: [
//   // { model: User, attributes: [] },
//   { model: Like },

// ],
// group: ['Likes.user_id'],
// order: [[sequelize.col('count'), 'DESC']],
