const express=require('express');
const router=express.Router();
const Joi=require('joi');
const validateRequest=require('../_middleware/validate-request');
const authorize=require('../_middleware/authorize');
const expenseService=require('../expenses/users.service');

//routes
router.post('/create', authorize(),createSchema, create);
router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports=router;


function createSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        amount: Joi.string().required(),
        imageUrl: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    expenseService.create(req.body)
        .then(() => res.json({ message: 'Expense added successfully' }))
        .catch(next);
}

function getAll(req, res, next) {
    expenseService.getAll()
        .then(expenses => res.json(expenses))
        .catch(next);
}

function getCurrent(req, res, next) {
    res.json(req.user);
}

function getById(req, res, next) {
    expenseService.getById(req.params.id)
        .then(expense => res.json(expense))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().empty(''),
        description: Joi.string().empty(''),
        amount: Joi.string().empty(''),
        imageUrl: Joi.string().empty('')
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    expenseService.update(req.params.id, req.body)
        .then(expense => res.json(expense))
        .catch(next);
}

function _delete(req, res, next) {
    expenseService.delete(req.params.id)
        .then(() => res.json({ message: 'Expense deleted successfully' }))
        .catch(next);
}
