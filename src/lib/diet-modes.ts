export type DietMode = 'standard' | 'express' | 'weight_loss' | 'recovery' | 'muscle_gain' | 'vegan';

export type DietModeConfig = {
  id: DietMode;
  name: string;
  description: string;
  icon: string;
  caloriesGoal: number;
  proteinGoal: number;
  fatsGoal: number;
  carbsGoal: number;
  maxComplexity: number;
  excludeCategories?: string[];
};

export const dietModes: Record<DietMode, DietModeConfig> = {
  standard: {
    id: 'standard',
    name: 'Стандартный',
    description: 'Сбалансированное питание для обычного дня',
    icon: '🍽️',
    caloriesGoal: 2000,
    proteinGoal: 150,
    fatsGoal: 70,
    carbsGoal: 250,
    maxComplexity: 5
  },
  express: {
    id: 'express',
    name: 'Экспресс-меню',
    description: 'Быстрые блюда до 30 минут',
    icon: '⚡',
    caloriesGoal: 1800,
    proteinGoal: 130,
    fatsGoal: 65,
    carbsGoal: 220,
    maxComplexity: 2
  },
  weight_loss: {
    id: 'weight_loss',
    name: 'Похудение',
    description: 'Низкокалорийные блюда для снижения веса',
    icon: '📉',
    caloriesGoal: 1400,
    proteinGoal: 120,
    fatsGoal: 45,
    carbsGoal: 150,
    maxComplexity: 5
  },
  recovery: {
    id: 'recovery',
    name: 'Восстановление',
    description: 'Легкоусвояемые блюда после болезни',
    icon: '💊',
    caloriesGoal: 1600,
    proteinGoal: 100,
    fatsGoal: 50,
    carbsGoal: 200,
    maxComplexity: 2,
    excludeCategories: ['жареное', 'острое']
  },
  muscle_gain: {
    id: 'muscle_gain',
    name: 'Набор массы',
    description: 'Высококалорийное питание с большим содержанием белка',
    icon: '💪',
    caloriesGoal: 2800,
    proteinGoal: 200,
    fatsGoal: 90,
    carbsGoal: 350,
    maxComplexity: 5
  },
  vegan: {
    id: 'vegan',
    name: 'Веганское',
    description: 'Без продуктов животного происхождения',
    icon: '🌱',
    caloriesGoal: 2000,
    proteinGoal: 120,
    fatsGoal: 70,
    carbsGoal: 280,
    maxComplexity: 5,
    excludeCategories: ['мясо', 'рыба', 'молочное', 'яйца']
  }
};

export const getFilteredRecipesByMode = (recipes: any[], mode: DietMode) => {
  const config = dietModes[mode];
  
  return recipes.filter(recipe => {
    if (mode === 'express' && recipe.time > 30) return false;
    if (recipe.complexity > config.maxComplexity) return false;
    if (mode === 'weight_loss' && recipe.calories > 400) return false;
    
    return true;
  });
};
