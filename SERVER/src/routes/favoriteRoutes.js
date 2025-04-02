const favoriteRoutes = require('express').Router();

const { Favourite, User, Reciept } = require('../db/models');

favoriteRoutes.post('/:reciept_id', async (req, res) => {
  const { reciept_id } = req.params;
  const user_id = 1;
  try {
    const existingFavorite = await Favourite.findOne({
      where: {
        user_id,
        reciept_id,
      },
    });

    if (existingFavorite) {
      return res.status(400).json({ message: 'Рецепт уже в избранном' });
    }

    // Создаем новую запись в избранном
    const newFavorite = await Favourite.create({
      user_id,
      reciept_id,
    });

    res.status(201).json({
      success: true,
      favorite: newFavorite,
    });
  } catch (error) {
    console.error('Ошибка при добавлении в избранное:', error);
    res.status(500).json({
      success: false,
      message: 'Произошла ошибка при добавлении в избранное',
    });
  }
});

favoriteRoutes.get('/users/:userId/likes/tweets', async (req, res) => {
  const { userId } = req.params;
  const user = await User.findByPk(userId, {
    include: 'likedRecept',
  });
  res.status(200).json(user.likedTweets);
});

module.exports = favoriteRoutes;
