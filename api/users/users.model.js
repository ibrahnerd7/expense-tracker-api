const {DataTypes} =require('sequelize');

module.exports=model;

function model(sequelize){
    const attributes={
        userName:{type:DataTypes.STRING,allowNull:false},
        email:{type:DataTypes.STRING,allowNull:false},
        picture:{type:DataTypes.STRING,allowNull:false},
        password:{type:DataTypes.STRING,allowNull:false}
    }

    const options={
        defaultScope:{
            attributes:{exclude:['password']}
        },
        scopes:{
            withPassword:{attributes:{},}
        }
    }

    return sequelize.define('User',attributes,options);
}