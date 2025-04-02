const recieptRouter = require('express').Router();

const RecieptController = require('../controllers/Reciept.controller');

recieptRouter.get('/', RecieptController.getAll);



recieptRouter.get('/:id', RecieptController.getOne);
recieptRouter.get('/:id', RecieptController.getFavs);
