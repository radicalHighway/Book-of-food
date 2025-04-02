const recieptRouter = require('express').Router();
const { Reciept } = require('../db/models');

recieptRouter.route('/').get(async (req, res) => {
  try {
    const reciepts = await Reciept.findAll();
    console.log(reciepts);

    if (!reciepts) {
      res.status(400).send('Ошибка получения рецептов');
    }
    res.status(200).json(reciepts);
  } catch (error) {
    console.error('Ошибка получения рецептов:', error);
    res.status(500).send('Внутренняя ошибка сервера');
  }
});

module.exports = recieptRouter;
