const config=require('../config.json');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const db=require('../_helpers/db');

module.exports={
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete : _delete
}

async function authenticate({userName,password}){
    const user=await db.User.scope('withPassword').findOne({where:{userName}});

    if(!user || !(await bcrypt.compare(password,user.password)))
        throw 'Username or password is incorrect';

    //authenticate successfully
    const token=jwt.sign({sub:user.id},config.secret,{expiresIn:'7d'});
    return {...omitPassword(user.get()),token }
}

async function getAll(){
    return await db.User.findAll();
}

async function getById(id){
    return await getUser(id);
}

async function create(params){
    //validate
    if(await db.User.findOne({where:{userName:params.userName}})){
        throw 'UserName "' + params.userName + '" is already taken';
    }

    //hash password
    if(params.password){
        params.password=await bcrypt.hash(params.password,10);
    }

    //save user
    await db.User.create(params);
}

async function update(id,params){
    const user=await getUser(id);

    //validate
    const userNameChanged=params.userName && user.userName !== params.userName;
    if(userNameChanged && await db.User.findOne({where:{userName:params.userName}})){
        throw 'Username "' + params.userName + '" is already taken';
    }

    //hash password is it was entered
    if(params.password){
        params.password=await bcrypt.hash(params.password,10);
    }

    //copy params to user and save
    Object.assign(user,params);
    await user.save();

    return omitPassword(user.get());
}

async function _delete(id){
    const user=await getUser(id);
    await user.destroy();
}


//Helper functions
async function getUser(id){
    const user=await db.User.findByPk(id);
    if(!user) throw 'User not found';
    return user;
}

function omitPassword(user){
    const {password, ...userWithoutPassword}=user;
    return userWithoutPassword;
}