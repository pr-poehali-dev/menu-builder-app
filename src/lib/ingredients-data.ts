export type Region = 
  | 'moscow' | 'spb' | 'kazan' | 'ekb' | 'nnovgorod' | 'chelyabinsk' | 'samara' 
  | 'omsk' | 'rostov' | 'ufa' | 'krasnoyarsk' | 'voronezh' | 'perm' | 'volgograd' 
  | 'krasnodar' | 'saratov' | 'tyumen' | 'tolyatti' | 'izhevsk' | 'barnaul' 
  | 'vladivostok' | 'irkutsk' | 'khabarovsk' | 'yaroslavl' | 'makhachkala' 
  | 'tomsk' | 'orenburg' | 'kemerovo' | 'novokuznetsk' | 'ryazan' | 'astrakhan' 
  | 'naberezhnye' | 'penza' | 'lipetsk' | 'tula' | 'kirov' | 'cheboksary' 
  | 'kaliningrad' | 'bryansk' | 'ivanovo' | 'magnitogorsk' | 'kursk' | 'tver' 
  | 'sochi' | 'stavropol' | 'belgorod' | 'arkhangelsk' | 'vladimir' | 'surgut' 
  | 'smolensk' | 'kaluga' | 'chita' | 'oryol' | 'yakutsk' | 'murmansk';

export type Allergen = 'глютен' | 'лактоза' | 'яйца' | 'орехи' | 'морепродукты' | 'соя' | 'рыба' | 'кунжут' | 'горчица' | 'сельдерей';

export type IngredientPrice = {
  name: string;
  category: string;
  prices: Record<Region, number>;
  unit: string;
  calories: number;
  protein: number;
  fats: number;
  carbs: number;
  allergens?: Allergen[];
};

export const regions: Record<Region, string> = {
  arkhangelsk: 'Архангельск',
  astrakhan: 'Астрахань',
  barnaul: 'Барнаул',
  belgorod: 'Белгород',
  bryansk: 'Брянск',
  vladivostok: 'Владивосток',
  vladimir: 'Владимир',
  volgograd: 'Волгоград',
  voronezh: 'Воронеж',
  ekb: 'Екатеринбург',
  ivanovo: 'Иваново',
  izhevsk: 'Ижевск',
  irkutsk: 'Иркутск',
  kaliningrad: 'Калининград',
  kaluga: 'Калуга',
  kazan: 'Казань',
  kemerovo: 'Кемерово',
  kirov: 'Киров',
  krasnodar: 'Краснодар',
  krasnoyarsk: 'Красноярск',
  kursk: 'Курск',
  lipetsk: 'Липецк',
  magnitogorsk: 'Магнитогорск',
  makhachkala: 'Махачкала',
  moscow: 'Москва',
  murmansk: 'Мурманск',
  naberezhnye: 'Набережные Челны',
  nnovgorod: 'Нижний Новгород',
  novokuznetsk: 'Новокузнецк',
  omsk: 'Омск',
  orenburg: 'Оренбург',
  oryol: 'Орёл',
  penza: 'Пенза',
  perm: 'Пермь',
  rostov: 'Ростов-на-Дону',
  ryazan: 'Рязань',
  samara: 'Самара',
  spb: 'Санкт-Петербург',
  saratov: 'Саратов',
  smolensk: 'Смоленск',
  sochi: 'Сочи',
  stavropol: 'Ставрополь',
  surgut: 'Сургут',
  tver: 'Тверь',
  tolyatti: 'Тольятти',
  tomsk: 'Томск',
  tula: 'Тула',
  tyumen: 'Тюмень',
  ufa: 'Уфа',
  khabarovsk: 'Хабаровск',
  cheboksary: 'Чебоксары',
  chelyabinsk: 'Челябинск',
  chita: 'Чита',
  yakutsk: 'Якутск',
  yaroslavl: 'Ярославль'
};

// Коэффициенты цен для регионов (относительно Москвы = 1.0)
const regionCoefficients: Record<Region, number> = {
  moscow: 1.0, spb: 0.96, kazan: 0.79, ekb: 0.82, nnovgorod: 0.77, chelyabinsk: 0.75, samara: 0.78,
  omsk: 0.73, rostov: 0.71, ufa: 0.73, krasnoyarsk: 0.88, voronezh: 0.75, perm: 0.78, volgograd: 0.73,
  krasnodar: 0.72, saratov: 0.73, tyumen: 0.83, tolyatti: 0.76, izhevsk: 0.74, barnaul: 0.71,
  vladivostok: 1.21, irkutsk: 0.92, khabarovsk: 1.17, yaroslavl: 0.78, makhachkala: 0.68,
  tomsk: 0.80, orenburg: 0.72, kemerovo: 0.73, novokuznetsk: 0.72, ryazan: 0.76, astrakhan: 0.70,
  naberezhnye: 0.73, penza: 0.73, lipetsk: 0.74, tula: 0.77, kirov: 0.75, cheboksary: 0.73,
  kaliningrad: 0.90, bryansk: 0.74, ivanovo: 0.73, magnitogorsk: 0.73, kursk: 0.73, tver: 0.78,
  sochi: 0.82, stavropol: 0.71, belgorod: 0.75, arkhangelsk: 0.96, vladimir: 0.76, surgut: 1.04,
  smolensk: 0.75, kaluga: 0.78, chita: 0.79, oryol: 0.74, yakutsk: 1.38, murmansk: 1.13
};

// Утилита для расчета цен по всем регионам
const calculateRegionPrices = (moscowPrice: number): Record<Region, number> => {
  const prices: Partial<Record<Region, number>> = {};
  for (const [region, coef] of Object.entries(regionCoefficients) as [Region, number][]) {
    prices[region] = Math.round(moscowPrice * coef);
  }
  return prices as Record<Region, number>;
};

export const ingredientsPrices: IngredientPrice[] = [
  {
    name: 'яйца',
    category: 'Молочные и яйца',
    prices: calculateRegionPrices(120),
    unit: '10 шт',
    calories: 157,
    protein: 13,
    fats: 11,
    carbs: 1
  },
  {
    name: 'молоко',
    category: 'Молочные и яйца',
    prices: calculateRegionPrices(85),
    unit: '1 л',
    calories: 64,
    protein: 3,
    fats: 3,
    carbs: 5
  },
  {
    name: 'сметана',
    category: 'Молочные и яйца',
    prices: calculateRegionPrices(95),
    unit: '300 г',
    calories: 206,
    protein: 3,
    fats: 20,
    carbs: 3
  },
  {
    name: 'творог',
    category: 'Молочные и яйца',
    prices: calculateRegionPrices(180),
    unit: '500 г',
    calories: 169,
    protein: 18,
    fats: 9,
    carbs: 3
  },
  {
    name: 'сыр',
    category: 'Молочные и яйца',
    prices: calculateRegionPrices(520),
    unit: '1 кг',
    calories: 356,
    protein: 25,
    fats: 27,
    carbs: 2
  },
  {
    name: 'моцарелла',
    category: 'Молочные и яйца',
    prices: calculateRegionPrices(380),
    unit: '250 г',
    calories: 280,
    protein: 22,
    fats: 22,
    carbs: 1
  },
  {
    name: 'пармезан',
    category: 'Молочные и яйца',
    prices: calculateRegionPrices(850),
    unit: '200 г',
    calories: 420,
    protein: 38,
    fats: 29,
    carbs: 4
  },
  {
    name: 'фета',
    category: 'Молочные и яйца',
    prices: calculateRegionPrices(450),
    unit: '200 г',
    calories: 264,
    protein: 14,
    fats: 21,
    carbs: 4
  },
  {
    name: 'маскарпоне',
    category: 'Молочные и яйца',
    prices: calculateRegionPrices(420),
    unit: '250 г',
    calories: 453,
    protein: 5,
    fats: 47,
    carbs: 5
  },
  {
    name: 'сливки',
    category: 'Молочные и яйца',
    prices: calculateRegionPrices(145),
    unit: '500 мл',
    calories: 337,
    protein: 2,
    fats: 35,
    carbs: 4
  },
  {
    name: 'помидор',
    category: 'Овощи',
    prices: calculateRegionPrices(180),
    unit: '1 кг',
    calories: 18,
    protein: 1,
    fats: 0,
    carbs: 4
  },
  {
    name: 'огурец',
    category: 'Овощи',
    prices: calculateRegionPrices(150),
    unit: '1 кг',
    calories: 15,
    protein: 1,
    fats: 0,
    carbs: 3
  },
  {
    name: 'картофель',
    category: 'Овощи',
    prices: calculateRegionPrices(45),
    unit: '1 кг',
    calories: 77,
    protein: 2,
    fats: 0,
    carbs: 17
  },
  {
    name: 'лук',
    category: 'Овощи',
    prices: calculateRegionPrices(35),
    unit: '1 кг',
    calories: 40,
    protein: 1,
    fats: 0,
    carbs: 9
  },
  {
    name: 'морковь',
    category: 'Овощи',
    prices: calculateRegionPrices(42),
    unit: '1 кг',
    calories: 41,
    protein: 1,
    fats: 0,
    carbs: 10
  },
  {
    name: 'перец',
    category: 'Овощи',
    prices: calculateRegionPrices(280),
    unit: '1 кг',
    calories: 27,
    protein: 1,
    fats: 0,
    carbs: 6
  },
  {
    name: 'капуста',
    category: 'Овощи',
    prices: calculateRegionPrices(38),
    unit: '1 кг',
    calories: 25,
    protein: 1,
    fats: 0,
    carbs: 6
  },
  {
    name: 'свёкла',
    category: 'Овощи',
    prices: calculateRegionPrices(48),
    unit: '1 кг',
    calories: 43,
    protein: 2,
    fats: 0,
    carbs: 10
  },
  {
    name: 'баклажан',
    category: 'Овощи',
    prices: calculateRegionPrices(165),
    unit: '1 кг',
    calories: 25,
    protein: 1,
    fats: 0,
    carbs: 6
  },
  {
    name: 'кабачок',
    category: 'Овощи',
    prices: calculateRegionPrices(95),
    unit: '1 кг',
    calories: 17,
    protein: 1,
    fats: 0,
    carbs: 3
  },
  {
    name: 'тыква',
    category: 'Овощи',
    prices: calculateRegionPrices(58),
    unit: '1 кг',
    calories: 26,
    protein: 1,
    fats: 0,
    carbs: 6
  },
  {
    name: 'брокколи',
    category: 'Овощи',
    prices: calculateRegionPrices(220),
    unit: '1 кг',
    calories: 34,
    protein: 3,
    fats: 0,
    carbs: 7
  },
  {
    name: 'салат',
    category: 'Овощи',
    prices: calculateRegionPrices(145),
    unit: 'пучок',
    calories: 15,
    protein: 1,
    fats: 0,
    carbs: 3
  },
  {
    name: 'чеснок',
    category: 'Овощи',
    prices: calculateRegionPrices(180),
    unit: '500 г',
    calories: 149,
    protein: 6,
    fats: 1,
    carbs: 33
  },
  {
    name: 'авокадо',
    category: 'Фрукты',
    prices: calculateRegionPrices(180),
    unit: '1 шт',
    calories: 160,
    protein: 2,
    fats: 15,
    carbs: 9
  },
  {
    name: 'лимон',
    category: 'Фрукты',
    prices: calculateRegionPrices(95),
    unit: '1 кг',
    calories: 29,
    protein: 1,
    fats: 0,
    carbs: 9
  },
  {
    name: 'лайм',
    category: 'Фрукты',
    prices: calculateRegionPrices(380),
    unit: '1 кг',
    calories: 30,
    protein: 1,
    fats: 0,
    carbs: 11
  },
  {
    name: 'банан',
    category: 'Фрукты',
    prices: calculateRegionPrices(85),
    unit: '1 кг',
    calories: 89,
    protein: 1,
    fats: 0,
    carbs: 23
  },
  {
    name: 'куриная грудка',
    category: 'Мясо и птица',
    prices: calculateRegionPrices(380),
    unit: '1 кг',
    calories: 165,
    protein: 31,
    fats: 4,
    carbs: 0
  },
  {
    name: 'курица',
    category: 'Мясо и птица',
    prices: calculateRegionPrices(280),
    unit: '1 кг',
    calories: 239,
    protein: 19,
    fats: 18,
    carbs: 0
  },
  {
    name: 'куриное филе',
    category: 'Мясо и птица',
    prices: calculateRegionPrices(380),
    unit: '1 кг',
    calories: 165,
    protein: 31,
    fats: 4,
    carbs: 0
  },
  {
    name: 'свинина',
    category: 'Мясо и птица',
    prices: calculateRegionPrices(420),
    unit: '1 кг',
    calories: 242,
    protein: 17,
    fats: 19,
    carbs: 0
  },
  {
    name: 'говядина',
    category: 'Мясо и птица',
    prices: calculateRegionPrices(550),
    unit: '1 кг',
    calories: 250,
    protein: 26,
    fats: 15,
    carbs: 0
  },
  {
    name: 'баранина',
    category: 'Мясо и птица',
    prices: calculateRegionPrices(650),
    unit: '1 кг',
    calories: 294,
    protein: 25,
    fats: 21,
    carbs: 0
  },
  {
    name: 'утка',
    category: 'Мясо и птица',
    prices: calculateRegionPrices(480),
    unit: '1 кг',
    calories: 337,
    protein: 16,
    fats: 29,
    carbs: 0
  },
  {
    name: 'фарш говяжий',
    category: 'Мясо и птица',
    prices: calculateRegionPrices(450),
    unit: '1 кг',
    calories: 254,
    protein: 17,
    fats: 20,
    carbs: 0
  },
  {
    name: 'бекон',
    category: 'Мясо и птица',
    prices: calculateRegionPrices(580),
    unit: '1 кг',
    calories: 541,
    protein: 37,
    fats: 42,
    carbs: 1
  },
  {
    name: 'колбаса',
    category: 'Мясо и птица',
    prices: calculateRegionPrices(420),
    unit: '1 кг',
    calories: 301,
    protein: 13,
    fats: 27,
    carbs: 2
  },
  {
    name: 'лосось',
    category: 'Рыба и морепродукты',
    prices: calculateRegionPrices(850),
    unit: '1 кг',
    calories: 208,
    protein: 20,
    fats: 13,
    carbs: 0
  },
  {
    name: 'семга',
    category: 'Рыба и морепродукты',
    prices: calculateRegionPrices(950),
    unit: '1 кг',
    calories: 208,
    protein: 20,
    fats: 13,
    carbs: 0
  },
  {
    name: 'креветки',
    category: 'Рыба и морепродукты',
    prices: calculateRegionPrices(780),
    unit: '1 кг',
    calories: 99,
    protein: 24,
    fats: 1,
    carbs: 0
  },
  {
    name: 'мидии',
    category: 'Рыба и морепродукты',
    prices: calculateRegionPrices(620),
    unit: '1 кг',
    calories: 86,
    protein: 12,
    fats: 2,
    carbs: 4
  },
  {
    name: 'кальмары',
    category: 'Рыба и морепродукты',
    prices: calculateRegionPrices(480),
    unit: '1 кг',
    calories: 92,
    protein: 18,
    fats: 1,
    carbs: 3
  },
  {
    name: 'рис',
    category: 'Крупы и макароны',
    prices: calculateRegionPrices(95),
    unit: '1 кг',
    calories: 130,
    protein: 3,
    fats: 0,
    carbs: 28
  },
  {
    name: 'рис арборио',
    category: 'Крупы и макароны',
    prices: calculateRegionPrices(280),
    unit: '1 кг',
    calories: 130,
    protein: 3,
    fats: 0,
    carbs: 28
  },
  {
    name: 'гречка',
    category: 'Крупы и макароны',
    prices: calculateRegionPrices(85),
    unit: '1 кг',
    calories: 123,
    protein: 4,
    fats: 1,
    carbs: 25
  },
  {
    name: 'овсянка',
    category: 'Крупы и макароны',
    prices: calculateRegionPrices(95),
    unit: '1 кг',
    calories: 68,
    protein: 2,
    fats: 1,
    carbs: 12
  },
  {
    name: 'спагетти',
    category: 'Крупы и макароны',
    prices: calculateRegionPrices(120),
    unit: '1 кг',
    calories: 158,
    protein: 5,
    fats: 1,
    carbs: 31
  },
  {
    name: 'паста',
    category: 'Крупы и макароны',
    prices: calculateRegionPrices(120),
    unit: '1 кг',
    calories: 158,
    protein: 5,
    fats: 1,
    carbs: 31
  },
  {
    name: 'листы лазаньи',
    category: 'Крупы и макароны',
    prices: calculateRegionPrices(220),
    unit: '500 г',
    calories: 158,
    protein: 5,
    fats: 1,
    carbs: 31
  },
  {
    name: 'мука',
    category: 'Выпечка',
    prices: calculateRegionPrices(65),
    unit: '2 кг',
    calories: 364,
    protein: 10,
    fats: 1,
    carbs: 76
  },
  {
    name: 'сахар',
    category: 'Выпечка',
    prices: calculateRegionPrices(85),
    unit: '1 кг',
    calories: 387,
    protein: 0,
    fats: 0,
    carbs: 100
  },
  {
    name: 'разрыхлитель',
    category: 'Выпечка',
    prices: calculateRegionPrices(75),
    unit: '100 г',
    calories: 0,
    protein: 0,
    fats: 0,
    carbs: 0
  },
  {
    name: 'дрожжи',
    category: 'Выпечка',
    prices: calculateRegionPrices(45),
    unit: '100 г',
    calories: 75,
    protein: 9,
    fats: 0,
    carbs: 11
  },
  {
    name: 'ваниль',
    category: 'Выпечка',
    prices: calculateRegionPrices(95),
    unit: '10 г',
    calories: 288,
    protein: 0,
    fats: 0,
    carbs: 13
  },
  {
    name: 'печенье',
    category: 'Выпечка',
    prices: calculateRegionPrices(145),
    unit: '500 г',
    calories: 417,
    protein: 7,
    fats: 14,
    carbs: 67
  },
  {
    name: 'савоярди',
    category: 'Выпечка',
    prices: calculateRegionPrices(250),
    unit: '400 г',
    calories: 392,
    protein: 8,
    fats: 8,
    carbs: 74
  },
  {
    name: 'грибы',
    category: 'Грибы и зелень',
    prices: calculateRegionPrices(320),
    unit: '1 кг',
    calories: 22,
    protein: 3,
    fats: 0,
    carbs: 3
  },
  {
    name: 'базилик',
    category: 'Грибы и зелень',
    prices: calculateRegionPrices(120),
    unit: 'пучок',
    calories: 23,
    protein: 3,
    fats: 1,
    carbs: 3
  },
  {
    name: 'кориандр',
    category: 'Грибы и зелень',
    prices: calculateRegionPrices(95),
    unit: 'пучок',
    calories: 23,
    protein: 2,
    fats: 1,
    carbs: 4
  },
  {
    name: 'зелень',
    category: 'Грибы и зелень',
    prices: calculateRegionPrices(85),
    unit: 'пучок',
    calories: 22,
    protein: 2,
    fats: 0,
    carbs: 4
  },
  {
    name: 'орехи',
    category: 'Орехи и семена',
    prices: calculateRegionPrices(480),
    unit: '500 г',
    calories: 654,
    protein: 15,
    fats: 65,
    carbs: 14
  },
  {
    name: 'кедровые орехи',
    category: 'Орехи и семена',
    prices: calculateRegionPrices(850),
    unit: '200 г',
    calories: 673,
    protein: 14,
    fats: 68,
    carbs: 13
  },
  {
    name: 'кунжут',
    category: 'Орехи и семена',
    prices: calculateRegionPrices(280),
    unit: '200 г',
    calories: 573,
    protein: 18,
    fats: 49,
    carbs: 23
  },
  {
    name: 'семечки',
    category: 'Орехи и семена',
    prices: calculateRegionPrices(150),
    unit: '500 г',
    calories: 584,
    protein: 21,
    fats: 53,
    carbs: 11
  },
  {
    name: 'хлеб',
    category: 'Хлебобулочные',
    prices: calculateRegionPrices(55),
    unit: '1 буханка',
    calories: 265,
    protein: 9,
    fats: 3,
    carbs: 49
  },
  {
    name: 'багет',
    category: 'Хлебобулочные',
    prices: calculateRegionPrices(85),
    unit: '1 шт',
    calories: 274,
    protein: 9,
    fats: 3,
    carbs: 56
  },
  {
    name: 'лаваш',
    category: 'Хлебобулочные',
    prices: calculateRegionPrices(45),
    unit: '1 шт',
    calories: 277,
    protein: 8,
    fats: 1,
    carbs: 57
  },
  {
    name: 'тортилья',
    category: 'Хлебобулочные',
    prices: calculateRegionPrices(95),
    unit: 'упаковка',
    calories: 312,
    protein: 8,
    fats: 8,
    carbs: 51
  },
  {
    name: 'тесто',
    category: 'Хлебобулочные',
    prices: calculateRegionPrices(120),
    unit: '500 г',
    calories: 274,
    protein: 9,
    fats: 3,
    carbs: 56
  },
  {
    name: 'блинчики',
    category: 'Хлебобулочные',
    prices: calculateRegionPrices(75),
    unit: 'упаковка',
    calories: 227,
    protein: 6,
    fats: 7,
    carbs: 35
  },
  {
    name: 'масло',
    category: 'Масла и соусы',
    prices: calculateRegionPrices(180),
    unit: '1 л',
    calories: 884,
    protein: 0,
    fats: 100,
    carbs: 0
  },
  {
    name: 'оливковое масло',
    category: 'Масла и соусы',
    prices: calculateRegionPrices(450),
    unit: '500 мл',
    calories: 884,
    protein: 0,
    fats: 100,
    carbs: 0
  },
  {
    name: 'сливочное масло',
    category: 'Масла и соусы',
    prices: calculateRegionPrices(280),
    unit: '200 г',
    calories: 717,
    protein: 1,
    fats: 81,
    carbs: 1
  },
  {
    name: 'соус цезарь',
    category: 'Масла и соусы',
    prices: calculateRegionPrices(220),
    unit: '250 мл',
    calories: 387,
    protein: 2,
    fats: 40,
    carbs: 8
  },
  {
    name: 'соус терияки',
    category: 'Масла и соусы',
    prices: calculateRegionPrices(280),
    unit: '250 мл',
    calories: 89,
    protein: 3,
    fats: 0,
    carbs: 15
  },
  {
    name: 'соус хойсин',
    category: 'Масла и соусы',
    prices: calculateRegionPrices(320),
    unit: '250 мл',
    calories: 220,
    protein: 1,
    fats: 1,
    carbs: 53
  },
  {
    name: 'томатная паста',
    category: 'Масла и соусы',
    prices: calculateRegionPrices(85),
    unit: '500 г',
    calories: 82,
    protein: 4,
    fats: 0,
    carbs: 18
  },
  {
    name: 'томатный соус',
    category: 'Масла и соусы',
    prices: calculateRegionPrices(95),
    unit: '500 г',
    calories: 29,
    protein: 1,
    fats: 0,
    carbs: 7
  },
  {
    name: 'уксус',
    category: 'Масла и соусы',
    prices: calculateRegionPrices(65),
    unit: '500 мл',
    calories: 18,
    protein: 0,
    fats: 0,
    carbs: 0
  },
  {
    name: 'мёд',
    category: 'Другое',
    prices: calculateRegionPrices(420),
    unit: '500 г',
    calories: 304,
    protein: 0,
    fats: 0,
    carbs: 82
  },
  {
    name: 'сироп',
    category: 'Другое',
    prices: calculateRegionPrices(380),
    unit: '250 мл',
    calories: 260,
    protein: 0,
    fats: 0,
    carbs: 67
  },
  {
    name: 'шоколад',
    category: 'Другое',
    prices: calculateRegionPrices(280),
    unit: '100 г',
    calories: 546,
    protein: 5,
    fats: 31,
    carbs: 63
  },
  {
    name: 'какао',
    category: 'Другое',
    prices: calculateRegionPrices(220),
    unit: '200 г',
    calories: 228,
    protein: 20,
    fats: 14,
    carbs: 58
  },
  {
    name: 'кофе',
    category: 'Другое',
    prices: calculateRegionPrices(420),
    unit: '250 г',
    calories: 2,
    protein: 0,
    fats: 0,
    carbs: 0
  },
  {
    name: 'соль',
    category: 'Специи',
    prices: calculateRegionPrices(25),
    unit: '1 кг',
    calories: 0,
    protein: 0,
    fats: 0,
    carbs: 0
  },
  {
    name: 'перец чили',
    category: 'Специи',
    prices: calculateRegionPrices(180),
    unit: '50 г',
    calories: 40,
    protein: 2,
    fats: 0,
    carbs: 9
  },
  {
    name: 'черный перец',
    category: 'Специи',
    prices: calculateRegionPrices(120),
    unit: '50 г',
    calories: 251,
    protein: 10,
    fats: 3,
    carbs: 64
  },
  {
    name: 'специи',
    category: 'Специи',
    prices: calculateRegionPrices(85),
    unit: '100 г',
    calories: 250,
    protein: 8,
    fats: 5,
    carbs: 50
  },
  {
    name: 'орегано',
    category: 'Специи',
    prices: calculateRegionPrices(95),
    unit: '30 г',
    calories: 265,
    protein: 9,
    fats: 4,
    carbs: 69
  },
  {
    name: 'тимьян',
    category: 'Специи',
    prices: calculateRegionPrices(110),
    unit: '30 г',
    calories: 101,
    protein: 6,
    fats: 2,
    carbs: 24
  },
  {
    name: 'кумин',
    category: 'Специи',
    prices: calculateRegionPrices(145),
    unit: '50 г',
    calories: 375,
    protein: 18,
    fats: 22,
    carbs: 44
  },
  {
    name: 'паприка',
    category: 'Специи',
    prices: calculateRegionPrices(120),
    unit: '50 г',
    calories: 282,
    protein: 14,
    fats: 13,
    carbs: 54
  },
  {
    name: 'зира',
    category: 'Специи',
    prices: calculateRegionPrices(150),
    unit: '50 г',
    calories: 375,
    protein: 18,
    fats: 22,
    carbs: 44
  },
  {
    name: 'розмарин',
    category: 'Специи',
    prices: calculateRegionPrices(125),
    unit: '30 г',
    calories: 131,
    protein: 3,
    fats: 6,
    carbs: 20
  },
  {
    name: 'имбирь',
    category: 'Специи',
    prices: calculateRegionPrices(320),
    unit: '200 г',
    calories: 80,
    protein: 2,
    fats: 1,
    carbs: 18
  },
  {
    name: 'горчица',
    category: 'Специи',
    prices: calculateRegionPrices(75),
    unit: '200 г',
    calories: 66,
    protein: 4,
    fats: 4,
    carbs: 6
  },
  {
    name: 'лавровый лист',
    category: 'Специи',
    prices: calculateRegionPrices(55),
    unit: '20 г',
    calories: 313,
    protein: 8,
    fats: 8,
    carbs: 75
  },
  {
    name: 'барбарис',
    category: 'Специи',
    prices: calculateRegionPrices(180),
    unit: '100 г',
    calories: 316,
    protein: 3,
    fats: 1,
    carbs: 79
  },
  {
    name: 'шафран',
    category: 'Специи',
    prices: calculateRegionPrices(850),
    unit: '1 г',
    calories: 310,
    protein: 11,
    fats: 6,
    carbs: 65
  },
  {
    name: 'нут',
    category: 'Бобовые',
    prices: calculateRegionPrices(165),
    unit: '500 г',
    calories: 164,
    protein: 9,
    fats: 3,
    carbs: 27
  },
  {
    name: 'фасоль',
    category: 'Бобовые',
    prices: calculateRegionPrices(145),
    unit: '500 г',
    calories: 127,
    protein: 8,
    fats: 1,
    carbs: 23
  },
  {
    name: 'тахини',
    category: 'Соусы и пасты',
    prices: calculateRegionPrices(380),
    unit: '250 г',
    calories: 595,
    protein: 17,
    fats: 54,
    carbs: 21
  },
  {
    name: 'паста том ям',
    category: 'Соусы и пасты',
    prices: calculateRegionPrices(320),
    unit: '200 г',
    calories: 120,
    protein: 2,
    fats: 8,
    carbs: 12
  },
  {
    name: 'карри паста',
    category: 'Соусы и пасты',
    prices: calculateRegionPrices(280),
    unit: '200 г',
    calories: 140,
    protein: 2,
    fats: 10,
    carbs: 14
  },
  {
    name: 'кокосовое молоко',
    category: 'Молочные альтернативы',
    prices: calculateRegionPrices(220),
    unit: '400 мл',
    calories: 230,
    protein: 2,
    fats: 24,
    carbs: 6
  },
  {
    name: 'маслины',
    category: 'Консервы',
    prices: calculateRegionPrices(165),
    unit: '300 г',
    calories: 115,
    protein: 1,
    fats: 11,
    carbs: 6
  },
  {
    name: 'сухарики',
    category: 'Снеки',
    prices: calculateRegionPrices(85),
    unit: '200 г',
    calories: 406,
    protein: 12,
    fats: 7,
    carbs: 74
  },
  {
    name: 'панировочные сухари',
    category: 'Выпечка',
    prices: calculateRegionPrices(65),
    unit: '500 г',
    calories: 395,
    protein: 13,
    fats: 5,
    carbs: 72
  },
  {
    name: 'бульон',
    category: 'Другое',
    prices: calculateRegionPrices(75),
    unit: '1 л',
    calories: 15,
    protein: 2,
    fats: 0,
    carbs: 1
  },
  {
    name: 'квас',
    category: 'Напитки',
    prices: calculateRegionPrices(85),
    unit: '2 л',
    calories: 27,
    protein: 0,
    fats: 0,
    carbs: 5
  },
  {
    name: 'белое вино',
    category: 'Алкоголь',
    prices: calculateRegionPrices(450),
    unit: '750 мл',
    calories: 82,
    protein: 0,
    fats: 0,
    carbs: 3
  },
  {
    name: 'лемонграсс',
    category: 'Экзотические специи',
    prices: calculateRegionPrices(280),
    unit: '50 г',
    calories: 99,
    protein: 1,
    fats: 0,
    carbs: 25
  },
  {
    name: 'галангал',
    category: 'Экзотические специи',
    prices: calculateRegionPrices(350),
    unit: '50 г',
    calories: 71,
    protein: 1,
    fats: 1,
    carbs: 15
  },
  {
    name: 'сельдерей',
    category: 'Овощи',
    prices: calculateRegionPrices(120),
    unit: '1 пучок',
    calories: 16,
    protein: 1,
    fats: 0,
    carbs: 3
  },
  {
    name: 'редис',
    category: 'Овощи',
    prices: calculateRegionPrices(95),
    unit: '1 пучок',
    calories: 16,
    protein: 1,
    fats: 0,
    carbs: 3
  },
  {
    name: 'виноградные листья',
    category: 'Другое',
    prices: calculateRegionPrices(280),
    unit: '200 г',
    calories: 93,
    protein: 6,
    fats: 2,
    carbs: 17
  },
  {
    name: 'йогурт',
    category: 'Молочные и яйца',
    prices: calculateRegionPrices(95),
    unit: '500 г',
    calories: 59,
    protein: 10,
    fats: 0,
    carbs: 4
  },
  {
    name: 'творожный сыр',
    category: 'Молочные и яйца',
    prices: calculateRegionPrices(320),
    unit: '500 г',
    calories: 350,
    protein: 8,
    fats: 34,
    carbs: 4
  },
  {
    name: 'чили',
    category: 'Овощи',
    prices: calculateRegionPrices(280),
    unit: '100 г',
    calories: 40,
    protein: 2,
    fats: 0,
    carbs: 9
  },
  {
    name: 'зеленый лук',
    category: 'Грибы и зелень',
    prices: calculateRegionPrices(75),
    unit: '1 пучок',
    calories: 32,
    protein: 2,
    fats: 0,
    carbs: 7
  }
];