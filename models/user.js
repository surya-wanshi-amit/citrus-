const sequelize = require('../dbconnection/database.js');

const Sequelize = require('sequelize');

const user=sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        unique:true,
        allowNull:false
    },

    password:{
        type:Sequelize.STRING,
        allowNull:false
    }
})
user.sync();
module.exports=user;