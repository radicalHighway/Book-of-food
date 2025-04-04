'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reciept extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsToMany(User, {
        foreignKey: 'reciept_id',
        through: 'Favourite',
      });
    }
  }
  Reciept.init(
    {
      name: DataTypes.STRING,
      url: DataTypes.STRING,
      time: DataTypes.TIME,
      instruction: DataTypes.TEXT,
      ingridients: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Reciept',
    },
  );
  return Reciept;
};
