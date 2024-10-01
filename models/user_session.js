'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_session.init({
    userId: DataTypes.INTEGER,
    cookie_token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user_session',
  });
  return user_session;
};