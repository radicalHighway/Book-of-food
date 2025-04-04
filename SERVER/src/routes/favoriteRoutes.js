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

// favoriteRoutes.post('/', verifyAccessToken, async (req, res) => {
//   try {
//     const { id: user_id } = res.locals.user;
//     const { name, url, time, instructions, ingredients } = req.body;

//     const recipe = await Reciept.create({
//       name,
//       url,
//       time,
//       instructions,
//       ingredients,
//       user_id,
//     });

//     res.status(201).json(recipe);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Не удалось создать рецепт' });
//   }
// });

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

favoriteRoutes.delete('/all', verifyAccessToken, async (req, res) => {
  const { id: user_id } = res.locals.user;

  try {
    const deletedCount = await Favourite.destroy({
      where: { user_id },
    });

    if (deletedCount === 0) {
      return res.status(404).json({ message: 'No favorites found' });
    }

    res.status(200).json({
      message: `Deleted ${deletedCount} favorites`,
    });
  } catch (error) {
    console.error('Error deleting favorites:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

favoriteRoutes.delete('/:reciept_id', verifyAccessToken, async (req, res) => {
  const { id: user_id } = res.locals.user;
  const { reciept_id } = req.params;

  try {
    const favorite = await Favourite.findOne({
      where: {
        user_id,
        reciept_id,
      },
    });

    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    await favorite.destroy();
    res.status(200).json({ message: 'Successfully deleted from favorites' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = favoriteRoutes;
