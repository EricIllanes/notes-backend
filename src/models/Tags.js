const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../../db").sequelize;

const Tag = sequelize.define("tags", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Tag;
