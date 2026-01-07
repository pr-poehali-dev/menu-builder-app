import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { type CalendarMeal, type Reminder, type Recipe, generateWeekDates, formatDateRu, mealTimeLabels, mealTimeIcons, defaultMealTimes, type MealTime } from '@/lib/calendar-data';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type CalendarTabProps = {
  meals: CalendarMeal[];
  reminders: Reminder[];
  recipes: Recipe[];
  addMeal: (recipeId: string, recipeName: string, date: string, time: MealTime) => void;
  toggleMealCompletion: (mealId: string) => void;
  removeMeal: (mealId: string) => void;
  addReminder: (title: string, date: string, time: string, type: 'meal' | 'workout' | 'custom', recipeId?: string) => void;
  toggleReminder: (reminderId: string) => void;
  removeReminder: (reminderId: string) => void;
  onSelectRecipe: (recipe: Recipe) => void;
};

const CalendarTab = ({
  meals,
  reminders,
  recipes,
  addMeal,
  toggleMealCompletion,
  removeMeal,
  addReminder,
  toggleReminder,
  removeReminder,
  onSelectRecipe
}: CalendarTabProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [newReminderTitle, setNewReminderTitle] = useState('');
  const [newReminderTime, setNewReminderTime] = useState('09:00');
  const [newReminderType, setNewReminderType] = useState<'meal' | 'workout' | 'custom'>('meal');
  const [addMealDialogOpen, setAddMealDialogOpen] = useState(false);
  const [selectedMealTime, setSelectedMealTime] = useState<MealTime>('breakfast');
  const [selectedRecipeId, setSelectedRecipeId] = useState('');

  const weekDates = generateWeekDates();
  const todayMeals = meals.filter(m => m.date === selectedDate);
  const todayReminders = reminders.filter(r => r.date === selectedDate);

  const handleAddMeal = () => {
    const recipe = recipes.find(r => r.id === selectedRecipeId);
    if (recipe) {
      addMeal(recipe.id, recipe.name, selectedDate, selectedMealTime);
      setAddMealDialogOpen(false);
      setSelectedRecipeId('');
    }
  };

  const handleAddReminder = () => {
    if (newReminderTitle.trim()) {
      addReminder(newReminderTitle, selectedDate, newReminderTime, newReminderType);
      setNewReminderTitle('');
      setNewReminderTime('09:00');
    }
  };

  return (
    <div className="space-y-3">
      <Card className="p-4 bg-white/95 backdrop-blur-sm border-orange-200 shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="Calendar" className="w-5 h-5 text-orange-600" />
          <h3 className="font-heading font-semibold text-lg text-gray-900">Календарь питания</h3>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-4">
          {weekDates.map(date => {
            const isToday = date === new Date().toISOString().split('T')[0];
            const isSelected = date === selectedDate;
            const dayMeals = meals.filter(m => m.date === date);
            
            return (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`p-2 rounded-lg text-center transition-all ${
                  isSelected ? 'bg-orange-500 text-white shadow-md' : 
                  isToday ? 'bg-orange-100 text-orange-900' : 
                  'bg-gray-50 text-gray-700 hover:bg-orange-50'
                }`}
              >
                <div className="text-[10px] font-medium">
                  {new Date(date).toLocaleDateString('ru', { weekday: 'short' })}
                </div>
                <div className={`text-lg font-bold ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                  {new Date(date).getDate()}
                </div>
                {dayMeals.length > 0 && (
                  <div className="flex justify-center gap-0.5 mt-1">
                    {[...Array(Math.min(dayMeals.length, 4))].map((_, i) => (
                      <div key={i} className={`w-1 h-1 rounded-full ${isSelected ? 'bg-white' : 'bg-orange-500'}`} />
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-900">{formatDateRu(selectedDate)}</h4>
            <Dialog open={addMealDialogOpen} onOpenChange={setAddMealDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-gradient-to-r from-orange-500 to-amber-600 text-white">
                  <Icon name="Plus" className="w-3 h-3 mr-1" />
                  Блюдо
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Добавить блюдо в календарь</DialogTitle>
                </DialogHeader>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-700 mb-1 block">Приём пищи</label>
                    <Select value={selectedMealTime} onValueChange={(v) => setSelectedMealTime(v as MealTime)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(mealTimeLabels).map(([key, label]) => (
                          <SelectItem key={key} value={key}>
                            {mealTimeIcons[key as MealTime]} {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-700 mb-1 block">Рецепт</label>
                    <Select value={selectedRecipeId} onValueChange={setSelectedRecipeId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите рецепт" />
                      </SelectTrigger>
                      <SelectContent>
                        {recipes.map(recipe => (
                          <SelectItem key={recipe.id} value={recipe.id}>
                            {recipe.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleAddMeal} disabled={!selectedRecipeId} className="w-full">
                    Добавить
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {todayMeals.length === 0 ? (
            <Card className="p-6 text-center bg-gray-50 border-gray-200">
              <p className="text-sm text-gray-500">Нет запланированных блюд</p>
            </Card>
          ) : (
            <div className="space-y-2">
              {Object.entries(mealTimeLabels).map(([time, label]) => {
                const timeMeals = todayMeals.filter(m => m.time === time);
                if (timeMeals.length === 0) return null;
                
                return (
                  <div key={time}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{mealTimeIcons[time as MealTime]}</span>
                      <span className="text-sm font-medium text-gray-700">{label}</span>
                      <span className="text-xs text-gray-500">{defaultMealTimes[time as MealTime]}</span>
                    </div>
                    {timeMeals.map(meal => {
                      const recipe = recipes.find(r => r.id === meal.recipeId);
                      return (
                        <Card key={meal.id} className="p-3 bg-white border-orange-100 hover:shadow-md transition-all">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <button
                                onClick={() => recipe && onSelectRecipe(recipe)}
                                className="text-left"
                              >
                                <h5 className="font-medium text-gray-900 hover:text-orange-600">{meal.recipeName}</h5>
                                {recipe && (
                                  <div className="flex gap-2 mt-1">
                                    <Badge className="bg-orange-50 text-orange-700 border-orange-200 text-xs">
                                      {recipe.time} мин
                                    </Badge>
                                    <Badge className="bg-red-50 text-red-700 border-red-200 text-xs">
                                      {recipe.calories} ккал
                                    </Badge>
                                  </div>
                                )}
                              </button>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => toggleMealCompletion(meal.id)}
                                className={meal.completed ? 'text-green-600' : 'text-gray-400'}
                              >
                                <Icon name={meal.completed ? 'CheckCircle2' : 'Circle'} className="w-5 h-5" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => removeMeal(meal.id)}
                                className="hover:text-red-600"
                              >
                                <Icon name="Trash2" className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Card>

      <Card className="p-4 bg-white/95 backdrop-blur-sm border-orange-200 shadow-md">
        <div className="flex items-center gap-2 mb-3">
          <Icon name="Bell" className="w-5 h-5 text-orange-600" />
          <h3 className="font-heading font-semibold text-gray-900">Напоминания</h3>
        </div>

        <div className="space-y-2 mb-3">
          <div className="flex gap-2">
            <Input
              placeholder="Название напоминания..."
              value={newReminderTitle}
              onChange={(e) => setNewReminderTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddReminder()}
            />
            <Input
              type="time"
              value={newReminderTime}
              onChange={(e) => setNewReminderTime(e.target.value)}
              className="w-24"
            />
            <Button onClick={handleAddReminder} size="icon" className="bg-gradient-to-r from-orange-500 to-amber-600">
              <Icon name="Plus" className="w-4 h-4" />
            </Button>
          </div>
          <Select value={newReminderType} onValueChange={(v) => setNewReminderType(v as 'meal' | 'workout' | 'custom')}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="meal">🍽️ Приём пищи</SelectItem>
              <SelectItem value="workout">💪 Тренировка</SelectItem>
              <SelectItem value="custom">📌 Другое</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {todayReminders.length === 0 ? (
          <Card className="p-4 text-center bg-gray-50 border-gray-200">
            <p className="text-sm text-gray-500">Нет напоминаний</p>
          </Card>
        ) : (
          <div className="space-y-2">
            {todayReminders.sort((a, b) => a.time.localeCompare(b.time)).map(reminder => (
              <Card key={reminder.id} className="p-3 bg-white border-orange-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-lg">
                      {reminder.type === 'meal' ? '🍽️' : reminder.type === 'workout' ? '💪' : '📌'}
                    </span>
                    <div className="flex-1">
                      <h5 className={`font-medium ${reminder.enabled ? 'text-gray-900' : 'text-gray-400'}`}>
                        {reminder.title}
                      </h5>
                      <p className="text-xs text-gray-500">{reminder.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => toggleReminder(reminder.id)}
                      className={reminder.enabled ? 'text-orange-600' : 'text-gray-400'}
                    >
                      <Icon name={reminder.enabled ? 'Bell' : 'BellOff'} className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => removeReminder(reminder.id)}
                      className="hover:text-red-600"
                    >
                      <Icon name="Trash2" className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default CalendarTab;
