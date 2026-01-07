export type Region = 'moscow' | 'spb' | 'regions' | 'south';

export type IngredientPrice = {
  name: string;
  category: string;
  prices: Record<Region, number>;
  unit: string;
  calories: number;
  protein: number;
  fats: number;
  carbs: number;
};

export const regions: Record<Region, string> = {
  moscow: 'Москва',
  spb: 'Санкт-Петербург',
  regions: 'Регионы РФ',
  south: 'Юг России'
};

export const ingredientsPrices: IngredientPrice[] = [
  {
    name: 'яйца',
    category: 'Молочные и яйца',
    prices: { moscow: 120, spb: 115, regions: 95, south: 85 },
    unit: '10 шт',
    calories: 157,
    protein: 13,
    fats: 11,
    carbs: 1
  },
  {
    name: 'молоко',
    category: 'Молочные и яйца',
    prices: { moscow: 85, spb: 80, regions: 65, south: 60 },
    unit: '1 л',
    calories: 64,
    protein: 3,
    fats: 3,
    carbs: 5
  },
  {
    name: 'сметана',
    category: 'Молочные и яйца',
    prices: { moscow: 95, spb: 90, regions: 75, south: 70 },
    unit: '300 г',
    calories: 206,
    protein: 3,
    fats: 20,
    carbs: 3
  },
  {
    name: 'творог',
    category: 'Молочные и яйца',
    prices: { moscow: 180, spb: 170, regions: 145, south: 135 },
    unit: '500 г',
    calories: 169,
    protein: 18,
    fats: 9,
    carbs: 3
  },
  {
    name: 'сыр',
    category: 'Молочные и яйца',
    prices: { moscow: 520, spb: 500, regions: 420, south: 390 },
    unit: '1 кг',
    calories: 356,
    protein: 25,
    fats: 27,
    carbs: 2
  },
  {
    name: 'моцарелла',
    category: 'Молочные и яйца',
    prices: { moscow: 380, spb: 365, regions: 310, south: 290 },
    unit: '250 г',
    calories: 280,
    protein: 22,
    fats: 22,
    carbs: 1
  },
  {
    name: 'пармезан',
    category: 'Молочные и яйца',
    prices: { moscow: 850, spb: 820, regions: 690, south: 640 },
    unit: '200 г',
    calories: 420,
    protein: 38,
    fats: 29,
    carbs: 4
  },
  {
    name: 'фета',
    category: 'Молочные и яйца',
    prices: { moscow: 450, spb: 430, regions: 360, south: 330 },
    unit: '200 г',
    calories: 264,
    protein: 14,
    fats: 21,
    carbs: 4
  },
  {
    name: 'маскарпоне',
    category: 'Молочные и яйца',
    prices: { moscow: 420, spb: 400, regions: 340, south: 315 },
    unit: '250 г',
    calories: 453,
    protein: 5,
    fats: 47,
    carbs: 5
  },
  {
    name: 'сливки',
    category: 'Молочные и яйца',
    prices: { moscow: 145, spb: 138, regions: 115, south: 105 },
    unit: '500 мл',
    calories: 337,
    protein: 2,
    fats: 35,
    carbs: 4
  },
  {
    name: 'помидор',
    category: 'Овощи',
    prices: { moscow: 180, spb: 170, regions: 140, south: 100 },
    unit: '1 кг',
    calories: 18,
    protein: 1,
    fats: 0,
    carbs: 4
  },
  {
    name: 'огурец',
    category: 'Овощи',
    prices: { moscow: 150, spb: 145, regions: 120, south: 85 },
    unit: '1 кг',
    calories: 15,
    protein: 1,
    fats: 0,
    carbs: 3
  },
  {
    name: 'картофель',
    category: 'Овощи',
    prices: { moscow: 45, spb: 42, regions: 32, south: 28 },
    unit: '1 кг',
    calories: 77,
    protein: 2,
    fats: 0,
    carbs: 17
  },
  {
    name: 'лук',
    category: 'Овощи',
    prices: { moscow: 35, spb: 33, regions: 25, south: 22 },
    unit: '1 кг',
    calories: 40,
    protein: 1,
    fats: 0,
    carbs: 9
  },
  {
    name: 'морковь',
    category: 'Овощи',
    prices: { moscow: 42, spb: 40, regions: 30, south: 26 },
    unit: '1 кг',
    calories: 41,
    protein: 1,
    fats: 0,
    carbs: 10
  },
  {
    name: 'перец',
    category: 'Овощи',
    prices: { moscow: 280, spb: 265, regions: 220, south: 180 },
    unit: '1 кг',
    calories: 27,
    protein: 1,
    fats: 0,
    carbs: 6
  },
  {
    name: 'капуста',
    category: 'Овощи',
    prices: { moscow: 38, spb: 36, regions: 28, south: 24 },
    unit: '1 кг',
    calories: 25,
    protein: 1,
    fats: 0,
    carbs: 6
  },
  {
    name: 'свёкла',
    category: 'Овощи',
    prices: { moscow: 48, spb: 45, regions: 35, south: 30 },
    unit: '1 кг',
    calories: 43,
    protein: 2,
    fats: 0,
    carbs: 10
  },
  {
    name: 'баклажан',
    category: 'Овощи',
    prices: { moscow: 165, spb: 155, regions: 130, south: 95 },
    unit: '1 кг',
    calories: 25,
    protein: 1,
    fats: 0,
    carbs: 6
  },
  {
    name: 'кабачок',
    category: 'Овощи',
    prices: { moscow: 95, spb: 90, regions: 75, south: 55 },
    unit: '1 кг',
    calories: 17,
    protein: 1,
    fats: 0,
    carbs: 3
  },
  {
    name: 'тыква',
    category: 'Овощи',
    prices: { moscow: 58, spb: 55, regions: 42, south: 35 },
    unit: '1 кг',
    calories: 26,
    protein: 1,
    fats: 0,
    carbs: 6
  },
  {
    name: 'брокколи',
    category: 'Овощи',
    prices: { moscow: 220, spb: 210, regions: 175, south: 155 },
    unit: '1 кг',
    calories: 34,
    protein: 3,
    fats: 0,
    carbs: 7
  },
  {
    name: 'салат',
    category: 'Овощи',
    prices: { moscow: 145, spb: 138, regions: 115, south: 95 },
    unit: 'пучок',
    calories: 15,
    protein: 1,
    fats: 0,
    carbs: 3
  },
  {
    name: 'чеснок',
    category: 'Овощи',
    prices: { moscow: 180, spb: 170, regions: 140, south: 120 },
    unit: '500 г',
    calories: 149,
    protein: 6,
    fats: 1,
    carbs: 33
  },
  {
    name: 'авокадо',
    category: 'Фрукты',
    prices: { moscow: 180, spb: 170, regions: 145, south: 135 },
    unit: '1 шт',
    calories: 160,
    protein: 2,
    fats: 15,
    carbs: 9
  },
  {
    name: 'лимон',
    category: 'Фрукты',
    prices: { moscow: 95, spb: 90, regions: 75, south: 65 },
    unit: '1 кг',
    calories: 29,
    protein: 1,
    fats: 0,
    carbs: 9
  },
  {
    name: 'лайм',
    category: 'Фрукты',
    prices: { moscow: 380, spb: 360, regions: 300, south: 280 },
    unit: '1 кг',
    calories: 30,
    protein: 1,
    fats: 0,
    carbs: 11
  },
  {
    name: 'банан',
    category: 'Фрукты',
    prices: { moscow: 85, spb: 82, regions: 68, south: 62 },
    unit: '1 кг',
    calories: 89,
    protein: 1,
    fats: 0,
    carbs: 23
  },
  {
    name: 'куриная грудка',
    category: 'Мясо и птица',
    prices: { moscow: 380, spb: 365, regions: 305, south: 280 },
    unit: '1 кг',
    calories: 165,
    protein: 31,
    fats: 4,
    carbs: 0
  },
  {
    name: 'курица',
    category: 'Мясо и птица',
    prices: { moscow: 280, spb: 265, regions: 220, south: 200 },
    unit: '1 кг',
    calories: 239,
    protein: 19,
    fats: 18,
    carbs: 0
  },
  {
    name: 'куриное филе',
    category: 'Мясо и птица',
    prices: { moscow: 380, spb: 365, regions: 305, south: 280 },
    unit: '1 кг',
    calories: 165,
    protein: 31,
    fats: 4,
    carbs: 0
  },
  {
    name: 'свинина',
    category: 'Мясо и птица',
    prices: { moscow: 420, spb: 400, regions: 335, south: 310 },
    unit: '1 кг',
    calories: 242,
    protein: 17,
    fats: 19,
    carbs: 0
  },
  {
    name: 'говядина',
    category: 'Мясо и птица',
    prices: { moscow: 550, spb: 520, regions: 435, south: 400 },
    unit: '1 кг',
    calories: 250,
    protein: 26,
    fats: 15,
    carbs: 0
  },
  {
    name: 'баранина',
    category: 'Мясо и птица',
    prices: { moscow: 650, spb: 620, regions: 520, south: 480 },
    unit: '1 кг',
    calories: 294,
    protein: 25,
    fats: 21,
    carbs: 0
  },
  {
    name: 'утка',
    category: 'Мясо и птица',
    prices: { moscow: 480, spb: 460, regions: 385, south: 355 },
    unit: '1 кг',
    calories: 337,
    protein: 16,
    fats: 29,
    carbs: 0
  },
  {
    name: 'фарш говяжий',
    category: 'Мясо и птица',
    prices: { moscow: 450, spb: 430, regions: 360, south: 330 },
    unit: '1 кг',
    calories: 254,
    protein: 17,
    fats: 20,
    carbs: 0
  },
  {
    name: 'бекон',
    category: 'Мясо и птица',
    prices: { moscow: 580, spb: 550, regions: 460, south: 425 },
    unit: '1 кг',
    calories: 541,
    protein: 37,
    fats: 42,
    carbs: 1
  },
  {
    name: 'колбаса',
    category: 'Мясо и птица',
    prices: { moscow: 420, spb: 400, regions: 335, south: 310 },
    unit: '1 кг',
    calories: 301,
    protein: 13,
    fats: 27,
    carbs: 2
  },
  {
    name: 'лосось',
    category: 'Рыба и морепродукты',
    prices: { moscow: 850, spb: 820, regions: 690, south: 640 },
    unit: '1 кг',
    calories: 208,
    protein: 20,
    fats: 13,
    carbs: 0
  },
  {
    name: 'семга',
    category: 'Рыба и морепродукты',
    prices: { moscow: 950, spb: 920, regions: 775, south: 720 },
    unit: '1 кг',
    calories: 208,
    protein: 20,
    fats: 13,
    carbs: 0
  },
  {
    name: 'креветки',
    category: 'Рыба и морепродукты',
    prices: { moscow: 780, spb: 750, regions: 630, south: 585 },
    unit: '1 кг',
    calories: 99,
    protein: 24,
    fats: 1,
    carbs: 0
  },
  {
    name: 'мидии',
    category: 'Рыба и морепродукты',
    prices: { moscow: 620, spb: 595, regions: 500, south: 465 },
    unit: '1 кг',
    calories: 86,
    protein: 12,
    fats: 2,
    carbs: 4
  },
  {
    name: 'кальмары',
    category: 'Рыба и морепродукты',
    prices: { moscow: 480, spb: 460, regions: 385, south: 355 },
    unit: '1 кг',
    calories: 92,
    protein: 18,
    fats: 1,
    carbs: 3
  },
  {
    name: 'рис',
    category: 'Крупы и макароны',
    prices: { moscow: 95, spb: 90, regions: 75, south: 70 },
    unit: '1 кг',
    calories: 130,
    protein: 3,
    fats: 0,
    carbs: 28
  },
  {
    name: 'рис арборио',
    category: 'Крупы и макароны',
    prices: { moscow: 280, spb: 265, regions: 220, south: 205 },
    unit: '1 кг',
    calories: 130,
    protein: 3,
    fats: 0,
    carbs: 28
  },
  {
    name: 'гречка',
    category: 'Крупы и макароны',
    prices: { moscow: 85, spb: 82, regions: 68, south: 62 },
    unit: '1 кг',
    calories: 123,
    protein: 4,
    fats: 1,
    carbs: 25
  },
  {
    name: 'овсянка',
    category: 'Крупы и макароны',
    prices: { moscow: 95, spb: 90, regions: 75, south: 70 },
    unit: '1 кг',
    calories: 68,
    protein: 2,
    fats: 1,
    carbs: 12
  },
  {
    name: 'спагетти',
    category: 'Крупы и макароны',
    prices: { moscow: 120, spb: 115, regions: 95, south: 88 },
    unit: '1 кг',
    calories: 158,
    protein: 5,
    fats: 1,
    carbs: 31
  },
  {
    name: 'паста',
    category: 'Крупы и макароны',
    prices: { moscow: 120, spb: 115, regions: 95, south: 88 },
    unit: '1 кг',
    calories: 158,
    protein: 5,
    fats: 1,
    carbs: 31
  },
  {
    name: 'листы лазаньи',
    category: 'Крупы и макароны',
    prices: { moscow: 220, spb: 210, regions: 175, south: 162 },
    unit: '500 г',
    calories: 158,
    protein: 5,
    fats: 1,
    carbs: 31
  },
  {
    name: 'мука',
    category: 'Выпечка',
    prices: { moscow: 65, spb: 62, regions: 48, south: 45 },
    unit: '2 кг',
    calories: 364,
    protein: 10,
    fats: 1,
    carbs: 76
  },
  {
    name: 'сахар',
    category: 'Выпечка',
    prices: { moscow: 85, spb: 82, regions: 68, south: 62 },
    unit: '1 кг',
    calories: 387,
    protein: 0,
    fats: 0,
    carbs: 100
  },
  {
    name: 'разрыхлитель',
    category: 'Выпечка',
    prices: { moscow: 75, spb: 72, regions: 60, south: 55 },
    unit: '100 г',
    calories: 0,
    protein: 0,
    fats: 0,
    carbs: 0
  },
  {
    name: 'дрожжи',
    category: 'Выпечка',
    prices: { moscow: 45, spb: 43, regions: 35, south: 32 },
    unit: '100 г',
    calories: 75,
    protein: 9,
    fats: 0,
    carbs: 11
  },
  {
    name: 'ваниль',
    category: 'Выпечка',
    prices: { moscow: 95, spb: 90, regions: 75, south: 70 },
    unit: '10 г',
    calories: 288,
    protein: 0,
    fats: 0,
    carbs: 13
  },
  {
    name: 'печенье',
    category: 'Выпечка',
    prices: { moscow: 145, spb: 138, regions: 115, south: 105 },
    unit: '500 г',
    calories: 417,
    protein: 7,
    fats: 14,
    carbs: 67
  },
  {
    name: 'савоярди',
    category: 'Выпечка',
    prices: { moscow: 250, spb: 240, regions: 200, south: 185 },
    unit: '400 г',
    calories: 392,
    protein: 8,
    fats: 8,
    carbs: 74
  },
  {
    name: 'грибы',
    category: 'Грибы и зелень',
    prices: { moscow: 320, spb: 305, regions: 255, south: 235 },
    unit: '1 кг',
    calories: 22,
    protein: 3,
    fats: 0,
    carbs: 3
  },
  {
    name: 'базилик',
    category: 'Грибы и зелень',
    prices: { moscow: 120, spb: 115, regions: 95, south: 85 },
    unit: 'пучок',
    calories: 23,
    protein: 3,
    fats: 1,
    carbs: 3
  },
  {
    name: 'кориандр',
    category: 'Грибы и зелень',
    prices: { moscow: 95, spb: 90, regions: 75, south: 65 },
    unit: 'пучок',
    calories: 23,
    protein: 2,
    fats: 1,
    carbs: 4
  },
  {
    name: 'зелень',
    category: 'Грибы и зелень',
    prices: { moscow: 85, spb: 82, regions: 68, south: 60 },
    unit: 'пучок',
    calories: 22,
    protein: 2,
    fats: 0,
    carbs: 4
  },
  {
    name: 'орехи',
    category: 'Орехи и семена',
    prices: { moscow: 480, spb: 460, regions: 385, south: 355 },
    unit: '500 г',
    calories: 654,
    protein: 15,
    fats: 65,
    carbs: 14
  },
  {
    name: 'кедровые орехи',
    category: 'Орехи и семена',
    prices: { moscow: 850, spb: 820, regions: 690, south: 640 },
    unit: '200 г',
    calories: 673,
    protein: 14,
    fats: 68,
    carbs: 13
  },
  {
    name: 'кунжут',
    category: 'Орехи и семена',
    prices: { moscow: 280, spb: 265, regions: 220, south: 205 },
    unit: '200 г',
    calories: 573,
    protein: 18,
    fats: 49,
    carbs: 23
  },
  {
    name: 'семечки',
    category: 'Орехи и семена',
    prices: { moscow: 150, spb: 145, regions: 120, south: 110 },
    unit: '500 г',
    calories: 584,
    protein: 21,
    fats: 53,
    carbs: 11
  },
  {
    name: 'хлеб',
    category: 'Хлебобулочные',
    prices: { moscow: 55, spb: 52, regions: 42, south: 38 },
    unit: '1 буханка',
    calories: 265,
    protein: 9,
    fats: 3,
    carbs: 49
  },
  {
    name: 'багет',
    category: 'Хлебобулочные',
    prices: { moscow: 85, spb: 82, regions: 68, south: 62 },
    unit: '1 шт',
    calories: 274,
    protein: 9,
    fats: 3,
    carbs: 56
  },
  {
    name: 'лаваш',
    category: 'Хлебобулочные',
    prices: { moscow: 45, spb: 43, regions: 35, south: 32 },
    unit: '1 шт',
    calories: 277,
    protein: 8,
    fats: 1,
    carbs: 57
  },
  {
    name: 'тортилья',
    category: 'Хлебобулочные',
    prices: { moscow: 95, spb: 90, regions: 75, south: 70 },
    unit: 'упаковка',
    calories: 312,
    protein: 8,
    fats: 8,
    carbs: 51
  },
  {
    name: 'тесто',
    category: 'Хлебобулочные',
    prices: { moscow: 120, spb: 115, regions: 95, south: 88 },
    unit: '500 г',
    calories: 274,
    protein: 9,
    fats: 3,
    carbs: 56
  },
  {
    name: 'блинчики',
    category: 'Хлебобулочные',
    prices: { moscow: 75, spb: 72, regions: 60, south: 55 },
    unit: 'упаковка',
    calories: 227,
    protein: 6,
    fats: 7,
    carbs: 35
  },
  {
    name: 'масло',
    category: 'Масла и соусы',
    prices: { moscow: 180, spb: 170, regions: 145, south: 135 },
    unit: '1 л',
    calories: 884,
    protein: 0,
    fats: 100,
    carbs: 0
  },
  {
    name: 'оливковое масло',
    category: 'Масла и соусы',
    prices: { moscow: 450, spb: 430, regions: 360, south: 330 },
    unit: '500 мл',
    calories: 884,
    protein: 0,
    fats: 100,
    carbs: 0
  },
  {
    name: 'сливочное масло',
    category: 'Масла и соусы',
    prices: { moscow: 280, spb: 265, regions: 220, south: 205 },
    unit: '200 г',
    calories: 717,
    protein: 1,
    fats: 81,
    carbs: 1
  },
  {
    name: 'соус цезарь',
    category: 'Масла и соусы',
    prices: { moscow: 220, spb: 210, regions: 175, south: 162 },
    unit: '250 мл',
    calories: 387,
    protein: 2,
    fats: 40,
    carbs: 8
  },
  {
    name: 'соус терияки',
    category: 'Масла и соусы',
    prices: { moscow: 280, spb: 265, regions: 220, south: 205 },
    unit: '250 мл',
    calories: 89,
    protein: 3,
    fats: 0,
    carbs: 15
  },
  {
    name: 'соус хойсин',
    category: 'Масла и соусы',
    prices: { moscow: 320, spb: 305, regions: 255, south: 235 },
    unit: '250 мл',
    calories: 220,
    protein: 1,
    fats: 1,
    carbs: 53
  },
  {
    name: 'томатная паста',
    category: 'Масла и соусы',
    prices: { moscow: 85, spb: 82, regions: 68, south: 62 },
    unit: '500 г',
    calories: 82,
    protein: 4,
    fats: 0,
    carbs: 18
  },
  {
    name: 'томатный соус',
    category: 'Масла и соусы',
    prices: { moscow: 95, spb: 90, regions: 75, south: 70 },
    unit: '500 г',
    calories: 29,
    protein: 1,
    fats: 0,
    carbs: 7
  },
  {
    name: 'уксус',
    category: 'Масла и соусы',
    prices: { moscow: 65, spb: 62, regions: 48, south: 45 },
    unit: '500 мл',
    calories: 18,
    protein: 0,
    fats: 0,
    carbs: 0
  },
  {
    name: 'мёд',
    category: 'Другое',
    prices: { moscow: 420, spb: 400, regions: 335, south: 310 },
    unit: '500 г',
    calories: 304,
    protein: 0,
    fats: 0,
    carbs: 82
  },
  {
    name: 'сироп',
    category: 'Другое',
    prices: { moscow: 380, spb: 365, regions: 305, south: 280 },
    unit: '250 мл',
    calories: 260,
    protein: 0,
    fats: 0,
    carbs: 67
  },
  {
    name: 'шоколад',
    category: 'Другое',
    prices: { moscow: 280, spb: 265, regions: 220, south: 205 },
    unit: '100 г',
    calories: 546,
    protein: 5,
    fats: 31,
    carbs: 63
  },
  {
    name: 'какао',
    category: 'Другое',
    prices: { moscow: 220, spb: 210, regions: 175, south: 162 },
    unit: '200 г',
    calories: 228,
    protein: 20,
    fats: 14,
    carbs: 58
  },
  {
    name: 'кофе',
    category: 'Другое',
    prices: { moscow: 420, spb: 400, regions: 335, south: 310 },
    unit: '250 г',
    calories: 2,
    protein: 0,
    fats: 0,
    carbs: 0
  },
  {
    name: 'соль',
    category: 'Специи',
    prices: { moscow: 25, spb: 24, regions: 18, south: 16 },
    unit: '1 кг',
    calories: 0,
    protein: 0,
    fats: 0,
    carbs: 0
  },
  {
    name: 'перец чили',
    category: 'Специи',
    prices: { moscow: 180, spb: 170, regions: 145, south: 120 },
    unit: '50 г',
    calories: 40,
    protein: 2,
    fats: 0,
    carbs: 9
  },
  {
    name: 'черный перец',
    category: 'Специи',
    prices: { moscow: 120, spb: 115, regions: 95, south: 88 },
    unit: '50 г',
    calories: 251,
    protein: 10,
    fats: 3,
    carbs: 64
  },
  {
    name: 'специи',
    category: 'Специи',
    prices: { moscow: 85, spb: 82, regions: 68, south: 62 },
    unit: '100 г',
    calories: 250,
    protein: 8,
    fats: 5,
    carbs: 50
  },
  {
    name: 'орегано',
    category: 'Специи',
    prices: { moscow: 95, spb: 90, regions: 75, south: 70 },
    unit: '30 г',
    calories: 265,
    protein: 9,
    fats: 4,
    carbs: 69
  },
  {
    name: 'тимьян',
    category: 'Специи',
    prices: { moscow: 110, spb: 105, regions: 85, south: 78 },
    unit: '30 г',
    calories: 101,
    protein: 6,
    fats: 2,
    carbs: 24
  },
  {
    name: 'кумин',
    category: 'Специи',
    prices: { moscow: 145, spb: 138, regions: 115, south: 105 },
    unit: '50 г',
    calories: 375,
    protein: 18,
    fats: 22,
    carbs: 44
  },
  {
    name: 'паприка',
    category: 'Специи',
    prices: { moscow: 120, spb: 115, regions: 95, south: 88 },
    unit: '50 г',
    calories: 282,
    protein: 14,
    fats: 13,
    carbs: 54
  },
  {
    name: 'зира',
    category: 'Специи',
    prices: { moscow: 150, spb: 145, regions: 120, south: 110 },
    unit: '50 г',
    calories: 375,
    protein: 18,
    fats: 22,
    carbs: 44
  },
  {
    name: 'розмарин',
    category: 'Специи',
    prices: { moscow: 125, spb: 120, regions: 100, south: 92 },
    unit: '30 г',
    calories: 131,
    protein: 3,
    fats: 6,
    carbs: 20
  },
  {
    name: 'имбирь',
    category: 'Специи',
    prices: { moscow: 320, spb: 305, regions: 255, south: 210 },
    unit: '200 г',
    calories: 80,
    protein: 2,
    fats: 1,
    carbs: 18
  },
  {
    name: 'горчица',
    category: 'Специи',
    prices: { moscow: 75, spb: 72, regions: 60, south: 55 },
    unit: '200 г',
    calories: 66,
    protein: 4,
    fats: 4,
    carbs: 6
  },
  {
    name: 'лавровый лист',
    category: 'Специи',
    prices: { moscow: 55, spb: 52, regions: 42, south: 38 },
    unit: '20 г',
    calories: 313,
    protein: 8,
    fats: 8,
    carbs: 75
  },
  {
    name: 'барбарис',
    category: 'Специи',
    prices: { moscow: 180, spb: 170, regions: 145, south: 135 },
    unit: '100 г',
    calories: 316,
    protein: 3,
    fats: 1,
    carbs: 79
  },
  {
    name: 'шафран',
    category: 'Специи',
    prices: { moscow: 850, spb: 820, regions: 690, south: 640 },
    unit: '1 г',
    calories: 310,
    protein: 11,
    fats: 6,
    carbs: 65
  },
  {
    name: 'нут',
    category: 'Бобовые',
    prices: { moscow: 165, spb: 155, regions: 130, south: 120 },
    unit: '500 г',
    calories: 164,
    protein: 9,
    fats: 3,
    carbs: 27
  },
  {
    name: 'фасоль',
    category: 'Бобовые',
    prices: { moscow: 145, spb: 138, regions: 115, south: 105 },
    unit: '500 г',
    calories: 127,
    protein: 8,
    fats: 1,
    carbs: 23
  },
  {
    name: 'тахини',
    category: 'Соусы и пасты',
    prices: { moscow: 380, spb: 365, regions: 305, south: 280 },
    unit: '250 г',
    calories: 595,
    protein: 17,
    fats: 54,
    carbs: 21
  },
  {
    name: 'паста том ям',
    category: 'Соусы и пасты',
    prices: { moscow: 320, spb: 305, regions: 255, south: 235 },
    unit: '200 г',
    calories: 120,
    protein: 2,
    fats: 8,
    carbs: 12
  },
  {
    name: 'карри паста',
    category: 'Соусы и пасты',
    prices: { moscow: 280, spb: 265, regions: 220, south: 205 },
    unit: '200 г',
    calories: 140,
    protein: 2,
    fats: 10,
    carbs: 14
  },
  {
    name: 'кокосовое молоко',
    category: 'Молочные альтернативы',
    prices: { moscow: 220, spb: 210, regions: 175, south: 162 },
    unit: '400 мл',
    calories: 230,
    protein: 2,
    fats: 24,
    carbs: 6
  },
  {
    name: 'маслины',
    category: 'Консервы',
    prices: { moscow: 165, spb: 155, regions: 130, south: 120 },
    unit: '300 г',
    calories: 115,
    protein: 1,
    fats: 11,
    carbs: 6
  },
  {
    name: 'сухарики',
    category: 'Снеки',
    prices: { moscow: 85, spb: 82, regions: 68, south: 62 },
    unit: '200 г',
    calories: 406,
    protein: 12,
    fats: 7,
    carbs: 74
  },
  {
    name: 'панировочные сухари',
    category: 'Выпечка',
    prices: { moscow: 65, spb: 62, regions: 48, south: 45 },
    unit: '500 г',
    calories: 395,
    protein: 13,
    fats: 5,
    carbs: 72
  },
  {
    name: 'бульон',
    category: 'Другое',
    prices: { moscow: 75, spb: 72, regions: 60, south: 55 },
    unit: '1 л',
    calories: 15,
    protein: 2,
    fats: 0,
    carbs: 1
  },
  {
    name: 'квас',
    category: 'Напитки',
    prices: { moscow: 85, spb: 82, regions: 68, south: 62 },
    unit: '2 л',
    calories: 27,
    protein: 0,
    fats: 0,
    carbs: 5
  },
  {
    name: 'белое вино',
    category: 'Алкоголь',
    prices: { moscow: 450, spb: 430, regions: 360, south: 330 },
    unit: '750 мл',
    calories: 82,
    protein: 0,
    fats: 0,
    carbs: 3
  },
  {
    name: 'лемонграсс',
    category: 'Экзотические специи',
    prices: { moscow: 280, spb: 265, regions: 220, south: 205 },
    unit: '50 г',
    calories: 99,
    protein: 1,
    fats: 0,
    carbs: 25
  },
  {
    name: 'галангал',
    category: 'Экзотические специи',
    prices: { moscow: 350, spb: 335, regions: 280, south: 260 },
    unit: '50 г',
    calories: 71,
    protein: 1,
    fats: 1,
    carbs: 15
  },
  {
    name: 'сельдерей',
    category: 'Овощи',
    prices: { moscow: 120, spb: 115, regions: 95, south: 85 },
    unit: '1 пучок',
    calories: 16,
    protein: 1,
    fats: 0,
    carbs: 3
  },
  {
    name: 'редис',
    category: 'Овощи',
    prices: { moscow: 95, spb: 90, regions: 75, south: 65 },
    unit: '1 пучок',
    calories: 16,
    protein: 1,
    fats: 0,
    carbs: 3
  },
  {
    name: 'виноградные листья',
    category: 'Другое',
    prices: { moscow: 280, spb: 265, regions: 220, south: 180 },
    unit: '200 г',
    calories: 93,
    protein: 6,
    fats: 2,
    carbs: 17
  },
  {
    name: 'йогурт',
    category: 'Молочные и яйца',
    prices: { moscow: 95, spb: 90, regions: 75, south: 70 },
    unit: '500 г',
    calories: 59,
    protein: 10,
    fats: 0,
    carbs: 4
  },
  {
    name: 'творожный сыр',
    category: 'Молочные и яйца',
    prices: { moscow: 320, spb: 305, regions: 255, south: 235 },
    unit: '500 г',
    calories: 350,
    protein: 8,
    fats: 34,
    carbs: 4
  },
  {
    name: 'чили',
    category: 'Овощи',
    prices: { moscow: 280, spb: 265, regions: 220, south: 180 },
    unit: '100 г',
    calories: 40,
    protein: 2,
    fats: 0,
    carbs: 9
  },
  {
    name: 'зеленый лук',
    category: 'Грибы и зелень',
    prices: { moscow: 75, spb: 72, regions: 60, south: 50 },
    unit: '1 пучок',
    calories: 32,
    protein: 2,
    fats: 0,
    carbs: 7
  }
];
