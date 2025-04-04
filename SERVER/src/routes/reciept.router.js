const recieptRouter = require('express').Router();
const { Reciept } = require('../db/models');
const { Sequelize } = require('sequelize');
const RecieptController = require('../controllers/Reciept.controller');
const { verifyAccessToken } = require('../middlewares/verifyToken');

// recieptRouter.get('/', RecieptController.getAll);

recieptRouter
  .route('/')
  .get(async (req, res) => {
    try {
      const reciepts = await Reciept.findAll({ order: Sequelize.fn('RANDOM') });

      if (!reciepts) {
        res.status(400).send('Ошибка получения рецептов');
      }
      res.status(200).json(reciepts);
    } catch (error) {
      console.error('Ошибка получения рецептов:', error);
      res.status(500).send('Внутренняя ошибка сервера');
    }
  })
  .post(verifyAccessToken, async (req, res) => {
    const { name, url, time, instruction, ingridients } = req.body;
    if (!name || !url || !time || !instruction || !ingridients) {
      return res.status(400).json({ message: 'Все поля обязательны для заполнения' });
    }
    try {
      const { id: user_id } = res.locals.user;
      const newRec = await Reciept.create({
        name,
        url,
        time,
        instruction,
        ingridients,
        user_id,
      });
      res.status(201).json(newRec);
    } catch (error) {
      console.error('Ошибка добавления рецепта', error);
      res.status(500).send('Внутренняя ошибка сервера');
    }
  });

recieptRouter.get('/:id', RecieptController.getOne);
recieptRouter.get('/:id', RecieptController.getFavs);

recieptRouter.delete('/:id', verifyAccessToken, async (req, res) => {
  const { id } = req.params;
  try {
    const delRec = await Reciept.destroy({
      where: {
        id,
      },
    });
    if (!delRec) {
      return res.status(404).send('Рецепт не найден');
    }
    res.status(204).json(delRec);
  } catch (error) {
    console.error('Ошибка удаления рецепта', error);
    res.status(500).send('Внутренняя ошибка сервера');
  }
});
module.exports = recieptRouter;
