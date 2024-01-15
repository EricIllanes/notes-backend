const { Sequelize, DataTypes } = require("sequelize");
const Tag = require("./Tags");

const sequelize = require("../../db").sequelize;

const Note = sequelize.define("notes", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  archived: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

Note.belongsToMany(Tag,{ through: 'note-tag'})
Tag.belongsToMany(Note, {through: 'note-tag'})
module.exports = Note