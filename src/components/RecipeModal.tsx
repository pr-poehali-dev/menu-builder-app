import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { type Recipe, getRecipeImage } from '@/lib/recipes-data';

type UserIngredient = {
  id: string;
  name: string;
  price: number;
};

type RecipeModalProps = {
  recipe: Recipe | null;
  ingredients: UserIngredient[];
  onClose: () => void;
  onAddToDaily: (recipe: Recipe) => void;
  onAddToCalendar?: (recipeId: string, recipeName: string, date: string, time: 'breakfast' | 'lunch' | 'dinner' | 'snack') => void;
};

const RecipeModal = ({ recipe, ingredients, onClose, onAddToDaily, onAddToCalendar }: RecipeModalProps) => {
  const [activeTimer, setActiveTimer] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState<number>(0);

  useEffect(() => {
    if (activeTimer === null || remainingTime <= 0) return;

    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          setActiveTimer(null);
          if ('vibrate' in navigator) navigator.vibrate([200, 100, 200]);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeTimer, remainingTime]);

  const startTimer = (stepIndex: number, seconds: number) => {
    setActiveTimer(stepIndex);
    setRemainingTime(seconds);
  };

  const stopTimer = () => {
    setActiveTimer(null);
    setRemainingTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!recipe) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-end justify-center z-50 animate-fade-in"
      onClick={onClose}
    >
      <Card
        className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-t-3xl animate-scale-in border-0 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white rounded-t-3xl z-10">
          <div className="relative h-64 overflow-hidden rounded-t-3xl">
            <img 
              src={getRecipeImage(recipe.id)} 
              alt={recipe.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full shadow-lg border-0"
              onClick={onClose}
            >
              <Icon name="X" className="w-5 h-5 text-gray-900" />
            </Button>
          </div>
          <div className="px-6 py-4">
            <h2 className="font-heading font-extrabold text-2xl mb-3 text-gray-900">{recipe.name}</h2>
            <div className="flex gap-2 flex-wrap">
              <Badge className="bg-blue-50 text-blue-700 border-0 font-medium rounded-full px-3 py-1">
                <Icon name="Clock" className="w-3 h-3 mr-1" />
                {recipe.time} мин
              </Badge>
              <Badge className="bg-red-50 text-red-700 border-0 font-medium rounded-full px-3 py-1">
                🔥 {recipe.calories} ккал
              </Badge>
              {recipe.regional && (
                <Badge className="bg-gradient-to-r from-violet-500 to-purple-600 text-white border-0 font-medium rounded-full px-3 py-1">
                  <Icon name="MapPin" className="w-3 h-3 mr-1" />
                  {recipe.regional}
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
            <h3 className="font-heading font-semibold text-lg mb-2 text-orange-900">Описание</h3>
            <p className="text-sm text-gray-700">{recipe.description}</p>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-3 text-gray-900 flex items-center gap-2">
              <span className="text-2xl">🧄</span>
              Ингредиенты
            </h3>
            <ul className="space-y-2 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-100">
              {recipe.ingredients.map((ing, idx) => {
                const hasIngredient = ingredients.some(userIng =>
                  userIng.name.toLowerCase().includes(ing.toLowerCase()) ||
                  ing.toLowerCase().includes(userIng.name.toLowerCase())
                );
                return (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <div className={`w-1.5 h-1.5 rounded-full ${hasIngredient ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <span className={hasIngredient ? 'text-green-700 font-medium' : ''}>{ing}</span>
                    {hasIngredient && <Icon name="Check" className="w-3 h-3 text-green-600 ml-auto" />}
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-3 text-gray-900 flex items-center gap-2">
              <span className="text-2xl">👨‍🍳</span>
              Приготовление
            </h3>
            <ol className="space-y-3">
              {recipe.steps.map((step, idx) => {
                const stepData = typeof step === 'string' ? { text: step } : step;
                const hasTimer = stepData.timer && stepData.timer > 0;
                const isTimerActive = activeTimer === idx;
                
                return (
                  <li key={idx} className="flex gap-3 items-start bg-white rounded-lg p-3 border border-orange-100 shadow-sm">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 text-white flex items-center justify-center text-xs font-bold shadow-md">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm mb-2 text-gray-700">{stepData.text}</p>
                      {hasTimer && (
                        <Button
                          size="sm"
                          variant={isTimerActive ? "default" : "outline"}
                          className={`text-xs ${isTimerActive ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white' : 'border-orange-300 text-orange-900 hover:bg-orange-50'}`}
                          onClick={() => {
                            if (isTimerActive) {
                              stopTimer();
                            } else {
                              startTimer(idx, stepData.timer!);
                            }
                          }}
                        >
                          <Icon name={isTimerActive ? "Pause" : "Timer"} className="w-3 h-3 mr-1" />
                          {isTimerActive ? formatTime(remainingTime) : `${Math.floor(stepData.timer! / 60)}:${(stepData.timer! % 60).toString().padStart(2, '0')}`}
                        </Button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
            <h3 className="font-heading font-semibold mb-3 text-green-900 flex items-center gap-2">
              <span className="text-2xl">🍎</span>
              Пищевая ценность
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-lg p-3 border border-green-100">
                <p className="text-xs text-green-700 font-medium">Белки</p>
                <p className="font-bold text-green-900">{recipe.protein} г</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-green-100">
                <p className="text-xs text-green-700 font-medium">Жиры</p>
                <p className="font-bold text-green-900">{recipe.fats} г</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-green-100">
                <p className="text-xs text-green-700 font-medium">Углеводы</p>
                <p className="font-bold text-green-900">{recipe.carbs} г</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-green-100">
                <p className="text-xs text-green-700 font-medium">Калории</p>
                <p className="font-bold text-green-900">{recipe.calories} ккал</p>
              </div>
            </div>
          </div>

          <Button
            className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-semibold py-6 shadow-lg text-base"
            onClick={() => {
              onAddToDaily(recipe);
              onClose();
            }}
          >
            <Icon name="Plus" className="w-5 h-5 mr-2" />
            Добавить в дневное меню
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default RecipeModal;