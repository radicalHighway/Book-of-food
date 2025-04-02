const { Reciept } = require('../db/models');

class RecieptService {
  static async getAllReciepts() {
    const users = await Reciept.findAll();
    const result = users.map((el) => el.get({ plain: true }));
    return result;
  }

  static async getOneRecieptById(id) {
    const reciept = await Reciept.findByPk(id);
    const result = Reciept.get({ plain: true });
    return result;
  }

  static async getFavsById(id) {
    const reciepts = await Reciept.findAll({ where: { id } });
    const result = reciepts.map((el) => el.get({ plain: true }));
    return result;
  }
}

module.exports = RecieptService;
