const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Post }) {
      this.belongsTo(User, { foreignKey: 'user_id' });
      this.belongsTo(Post, { foreignKey: 'post_id' });
      // define association here
    }
  }
  Favorite.init({
    user_id: DataTypes.INTEGER,
    post_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Favorite',
  });
  return Favorite;
};
