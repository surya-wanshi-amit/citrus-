const sequelize = require('../dbconnection/database.js');

const Sequelize = require('sequelize');
const user = require('./user.js');

const task = sequelize.define('task',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    title:{
        type:Sequelize.STRING,
        allowNull:false
    },
    due_date:{
        type:Sequelize.STRING,
        allowNull:false
    },
    file:{
        type:Sequelize.BLOB("long"),
        allowNull:false
    },
    user:{
        type : Sequelize.INTEGER,
        allowNull:false,
    }
})
task.sync();
module.exports=task;