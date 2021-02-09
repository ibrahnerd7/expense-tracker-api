const {DataTypes} =require('sequelize');

module.exports=model;

function model(sequelize){
    const attributes={
        title:{type:DataTypes.STRING,allowNull:false},
        description:{type:DataTypes.STRING,allowNull:false},
        amount:{type:DataTypes.STRING,allowNull:false},
        imageUrl:{type:DataTypes.STRING,allowNull:false}
    }

    return sequelize.define('Expense',attributes);
}