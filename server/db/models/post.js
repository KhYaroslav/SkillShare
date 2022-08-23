const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      User, Like, Comment, Favorite,
    }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'user_id' });
      this.hasMany(Like, { foreignKey: 'post_id' });
      this.hasMany(Comment, { foreignKey: 'post_id' });
      this.hasMany(Favorite, { foreignKey: 'post_id' });
    }
  }
  Post.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    file: DataTypes.TEXT,
    view: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
