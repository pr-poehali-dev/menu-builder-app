export type MealTime = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export type CalendarMeal = {
  id: string;
  date: string;
  time: MealTime;
  recipeId: string;
  recipeName: string;
  completed: boolean;
};

export type Reminder = {
  id: string;
  date: string;
  time: string;
  title: string;
  type: 'meal' | 'workout' | 'custom';
  enabled: boolean;
  recipeId?: string;
};

export const mealTimeLabels: Record<MealTime, string> = {
  breakfast: 'Завтрак',
  lunch: 'Обед',
  dinner: 'Ужин',
  snack: 'Перекус'
};

export const mealTimeIcons: Record<MealTime, string> = {
  breakfast: '🌅',
  lunch: '☀️',
  dinner: '🌙',
  snack: '🍎'
};

export const defaultMealTimes: Record<MealTime, string> = {
  breakfast: '08:00',
  lunch: '13:00',
  dinner: '19:00',
  snack: '16:00'
};

export const generateWeekDates = (startDate?: Date): string[] => {
  const start = startDate || new Date();
  const dates: string[] = [];
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
  }
  
  return dates;
};

export const formatDateRu = (dateStr: string): string => {
  const date = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dateOnly = new Date(date);
  dateOnly.setHours(0, 0, 0, 0);
  
  const diffDays = Math.floor((dateOnly.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Сегодня';
  if (diffDays === 1) return 'Завтра';
  if (diffDays === -1) return 'Вчера';
  
  const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
  
  return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`;
};
