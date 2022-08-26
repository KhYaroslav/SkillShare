const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      Post, Like, Comment, Favorite, Message, Question,
    }) {
      this.hasMany(Post, { foreignKey: 'user_id' });
      this.hasMany(Like, { foreignKey: 'user_id' });
      this.hasMany(Comment, { foreignKey: 'user_id' });
      this.hasMany(Favorite, { foreignKey: 'user_id' });
      this.hasMany(Message, { foreignKey: 'user_id' });
      this.hasMany(Question, { foreignKey: 'user_id' });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      avatar: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
