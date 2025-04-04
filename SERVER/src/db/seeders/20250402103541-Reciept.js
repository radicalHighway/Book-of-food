'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const reciepts = [
      {
        name: 'Омлет',
        url: 'https://cdn-files.kwigacdn.com/cabinet-6131/QjTkgMC46jth/yaichnica-omlet%20original.jpg',
        time: '00:15:00',
        instruction:
          'Взбейте яйца с молоком, добавьте соль и перец. Вылейте смесь в сковороду. Жарьте до готовности.',
        ingridients: 'Яйца, Молоко, Соль, Перец',
      },
      {
        name: 'Цезарь с курицей',
        url: 'https://avatars.mds.yandex.net/get-altay/3569559/2a0000017ae3525b9a90ba2fcb172195042b/XXXL',
        time: '00:30:00',
        instruction:
          'Приготовьте соус, обжарьте курицу и нарежьте овощи. Смешайте все компоненты и полейте соусом.',
        ingridients: 'Курица, Салат айсберг, Сыр пармезан, Соус Цезарь',
      },
      {
        name: 'Борщ',
        url: 'https://s14.stc.yc.kpcdn.net/share/i/12/12620192/wr-960.webp',
        time: '01:30:00',
        instruction:
          'Нарежьте овощи. Отварите мясо, добавьте овощи, тушите до готовности. Заправьте специями и чесноком.',
        ingridients: 'Свекла, Капуста, Морковь, Картофель, Мясо, Томатная паста',
      },
      {
        name: 'Паста Карбонара',
        url: 'https://100foto.club/uploads/posts/2022-06/1656039068_28-100foto-club-p-pasta-karbonara-s-yaitsom-sverkhu-54.jpg',
        time: '00:20:00',
        instruction:
          'Отварите пасту. Обжарьте бекон, смешайте со сливками, яйцом и сыром. Полейте пасту соусом.',
        ingridients: 'Паста, Бекон, Яйцо, Сливки, Сыр пармезан, Чеснок',
      },
      {
        name: 'Шашлык',
        url: 'https://ferma-m2.ru/images/shop/recipe_image/crop_500h500_02.jpg',
        time: '02:00:00',
        instruction:
          'Замаринуйте мясо, дайте постоять 2 часа. Насадите на шампуры, жарьте до золотистой корочки.',
        ingridients: 'Мясо, Лук, Уксус, Специи для шашлыка',
      },
      {
        name: 'Куриный суп',
        url: 'https://static.elementaree.ru/002852/thumb_m/05caf95f07233e97a993e860dd23167d.jpg',
        time: '01:00:00',
        instruction:
          'Отварите курицу, добавьте картофель, лук и морковь. Посолите, перчите, варите до готовности.',
        ingridients: 'Курица, Картофель, Лук, Морковь, Лавровый лист, Соль, Перец',
      },
      {
        name: 'Оливье',
        url: 'https://cosori.ru/media/posters/recipe/zv027drpdztrja69fs812vr66pkda2w5.jpg',
        time: '00:45:00',
        instruction:
          'Отварите картошку, яйца и морковь. Нарежьте кубиками остальные ингредиенты и добавьте майонез.',
        ingridients:
          'Картофель, Яйца, Колбаса, Морковь, Майонез, Огурцы солёные, Зелёный горошек',
      },
      {
        name: 'Селедка под шубой',
        url: 'https://pic.rutubelist.ru/video/04/da/04daa8b6bffadfd187726d934d890fbb.jpg',
        time: '01:00:00',
        instruction:
          'Отварите картофель, морковь и яйца. Нарежьте селедку и слоями выкладывайте в салатницу, чередуя с тертыми овощами.',
        ingridients: 'Соленая селедка, Картофель, Морковь, Яйца, Лук, Майонез',
      },
      {
        name: 'Рулька',
        url: 'https://adygsalt.ru/blog/foto/svinaya-rulka-v-duhovke/4.jpeg',
        time: '02:30:00',
        instruction:
          'Промойте рульку, посолите, поперчите и запекайте в духовке до золотистой корочки.',
        ingridients: 'Свинина (рулька), Чеснок, Лук, Специи для мяса',
      },
      {
        name: 'Яблочный штрудель',
        url: 'https://gourmandiz.dhnet.be/wp-content/uploads/2023/11/Recette-du-Strudel-aux-pommes-scaled.jpg',
        time: '01:20:00',
        instruction:
          'Раскатайте тесто, выложите фарш из яблок, изюма и корицы, сверните и запеките до золотистой корочки.',
        ingridients: 'Яблоки, Тесто, Изюм, Корица, Сахар',
      },
      {
        name: 'Крок Мадам',
        url: 'https://i.pinimg.com/originals/35/42/bb/3542bb83945e659ccc562a15015a409a.jpg',
        time: '00:30:00',
        instruction:
          'Приготовьте бутерброды с ветчиной и сыром, запекайте, потом добавьте жареное яйцо сверху.',
        ingridients: 'Хлеб, Ветчина, Сыр, Яйцо, Масло',
      },
      {
        name: 'Холодец',
        url: 'https://primemeat.ru/about/kak-gotovit-holodetc.jpg',
        time: '08:00:00',
        instruction:
          'Отварите мясо с костями до полной готовности. Процедите бульон, добавьте специи и залейте мясо желатином.',
        ingridients: 'Свинина, Говядина, Морковь, Чеснок, Желатин',
      },
      {
        name: 'Манты',
        url: 'https://i.pinimg.com/originals/ff/98/a0/ff98a0c38bcc2a95e66f62ae6166860a.jpg',
        time: '01:50:00',
        instruction:
          'Приготовьте тесто, сделайте начинку из мяса и лука, заверните и готовьте на пару.',
        ingridients: 'Мука, Фарш, Лук, Специи',
      },
      {
        name: 'Печеночный торт',
        url: 'https://p7.tabor.ru/feed/2024-04-10/50509763/4626713_760x500.jpg',
        time: '01:10:00',
        instruction:
          'Приготовьте печеночные блины, пропитайте их начинкой из лука и майонеза, уложите в торт.',
        ingridients: 'Печень, Яйца, Лук, Майонез, Перец',
      },
    ];

    await queryInterface.bulkInsert('Reciepts', reciepts, {});

    await queryInterface.bulkInsert('Users', [
      {
        name: 'Jane',
        email: 'jane@jane',
        password: await bcrypt.hash('123', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bob',
        email: 'bob@bob',
        password: await bcrypt.hash('123', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'ed',
        email: 'ed@mail',
        password: await bcrypt.hash('123', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('Favourites', [
      {
        user_id: 1,
        reciept_id: 3,
      },
      {
        user_id: 2,
        reciept_id: 4,
      },
      {
        user_id: 3,
        reciept_id: 2,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
