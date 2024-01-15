// const {Sequelize, DataTypes} =require('sequelize')
// const Note = require('./Notes')

// const sequelize = require('../../db').sequelize


// const User =sequelize.define('users', {
//     id:{
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     name:{
//         type: DataTypes.STRING
//     },
//     password:{
//         type: DataTypes.STRING
//     }
// })

// User.hasMany(Note,{
//     foreignKey: 'userID',
//     sourceKey: 'id'
// })

// Note.belongsTo(User,{
//     foreignKey: 'userID',
//     targetId: 'id'
// })
// module.exports = User;