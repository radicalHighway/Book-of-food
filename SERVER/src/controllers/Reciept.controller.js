const path = require('path');
const RecieptService = require('../services/Reciept.service');

class RecieptController {
  static async getAll(req, res) {
    try {
      const result = await RecieptService.getAllReciepts();
      res.status(200).json(result);
    } catch (error) {
      console.log('Ошибка получения', error);
      res.status(500).json(error);
    }
  }

  static async getOne(req, res) {
    try {
      const { id } = req.params;
      const reciept = await RecieptService.getOneRecieptById(id);
      const result = reciept.get({ plain: true });
      res.status(200).json(result)
    } catch (error) {
      console.log('Ошибка получения', error);
      res.status(500).json(error);
    }
  }

  static async getFavs(req, res) {
    try {
      const { id } = req.params;
      const favs = await RecieptService.getFavsById(id);
      const result = favs.get({ plain: true });
      res.status(200).json(result);
    } catch (error) {
      console.log('Ошибка получения', error);
      res.status(500).json(error);
    }
  }
}
module.exports = RecieptController
