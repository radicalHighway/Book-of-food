const favoriteRoutes = require('express').Router();

const { Favourite, User, Reciept } = require('../db/models');
const { verifyAccessToken } = require('../middlewares/verifyToken');

favoriteRoutes.post(
  '/reciept/:reciept_id/users/:user_id/likes',
  verifyAccessToken,
  async (req, res) => {
    const { reciept_id } = req.params;
    const { id: user_id } = res.locals.user;

    const [like, created] = await Favourite.findOrCreate({
      where: { user_id, reciept_id },
    });
    if (created) {
      res.status(201).json(like);
    } else {
      await like.destroy();
      res.status(201).json(like);
    }
  },
);

favoriteRoutes.get('/users/:user_id/likes', verifyAccessToken, async (req, res) => {
  try {
    const { id: user_id } = res.locals.user;

    const user = await User.findByPk(user_id, {
      include: [
        {
          model: Reciept,
          as: 'likedRecept',
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    res.status(200).json(user.likedRecept);
  } catch (error) {
    console.error('Ошибка:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});
module.exports = favoriteRoutes;
