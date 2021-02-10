const db=require('../_helpers/db');

module.exports={
    getAll,
    getById,
    create,
    update,
    delete : _delete
}


async function getAll(){
    return await db.Expense.findAll();
}

async function getById(id){
    return await getExpense(id);
}

async function create(params){
    //save expense
    await db.Expense.create(params);
}

async function update(id,params){
    const expense=await getExpense(id);

    //validate
    const titleChanged=params.title && expense.title !== params.title;
    if(titleChanged && await db.Expense.findOne({where:{title:params.title}})){
        throw 'Title "' + params.title + '" is already taken';
    }

    //copy params to expense and save
    Object.assign(expense,params);
    await expense.save();

    return expense.get();
}

async function _delete(id){
    const expense=await getExpense(id);
    await expense.destroy();
}


//Helper functions
async function getExpense(id){
    const expense=await db.Expense.findByPk(id);
    if(!expense) throw 'Expense not found';
    return expense;
}
