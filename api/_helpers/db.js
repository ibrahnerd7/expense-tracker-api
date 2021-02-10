const config=require('../config.json');
const mysql=require('mysql2/promise');
const {Sequelize}=require('sequelize');

module.exports=db={}

initialize();

async function initialize(){
    //Create database if it does not exist
    const {host,port, user, password,database}=config.database;
    console.log("config.database",config.database);
    const connection=await mysql.createConnection({host,port,user,password});
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    //connect to db
    const sequelize=new Sequelize('mysql://b1c69b8787dae0:cb035abc@us-cdbr-east-03.cleardb.com/heroku_aaeba0b0c26fad3?reconnect=true');

    //init models and add them to exported db object
    db.User=require('../users/users.model')(sequelize);
    db.Expense=require('../expenses/expenses.model')(sequelize);

    //sync all models with database
    await sequelize.sync();
}