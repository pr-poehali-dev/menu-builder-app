import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { type Recipe } from '@/lib/recipes-data';

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
};

const RecipeModal = ({ recipe, ingredients, onClose, onAddToDaily }: RecipeModalProps) => {
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
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end justify-center z-50 animate-fade-in"
      onClick={onClose}
    >
      <Card
        className="w-full max-w-md max-h-[85vh] overflow-y-auto bg-white rounded-t-3xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-gradient-to-r from-primary to-secondary text-white p-6 rounded-t-3xl z-10">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="font-heading font-bold text-2xl mb-2">{recipe.name}</h2>
              <div className="flex gap-2 flex-wrap">
                <Badge className="bg-white/20 text-white border-0">
                  <Icon name="Clock" className="w-3 h-3 mr-1" />
                  {recipe.time} мин
                </Badge>
                <Badge className="bg-white/20 text-white border-0">
                  🔥 {recipe.calories} ккал
                </Badge>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={onClose}
            >
              <Icon name="X" className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="font-heading font-semibold text-lg mb-3">Описание</h3>
            <p className="text-sm text-muted-foreground">{recipe.description}</p>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-3">Ингредиенты</h3>
            <ul className="space-y-2">
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
            <h3 className="font-heading font-semibold text-lg mb-3">Приготовление</h3>
            <ol className="space-y-3">
              {recipe.steps.map((step, idx) => {
                const stepData = typeof step === 'string' ? { text: step } : step;
                const hasTimer = stepData.timer && stepData.timer > 0;
                const isTimerActive = activeTimer === idx;
                
                return (
                  <li key={idx} className="flex gap-3 items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm mb-2">{stepData.text}</p>
                      {hasTimer && (
                        <Button
                          size="sm"
                          variant={isTimerActive ? "default" : "outline"}
                          className={`text-xs ${isTimerActive ? 'bg-gradient-to-r from-primary to-secondary' : ''}`}
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

          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-heading font-semibold mb-3">Пищевая ценность</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-muted-foreground">Белки</p>
                <p className="font-semibold">{recipe.protein} г</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Жиры</p>
                <p className="font-semibold">{recipe.fats} г</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Углеводы</p>
                <p className="font-semibold">{recipe.carbs} г</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Калории</p>
                <p className="font-semibold">{recipe.calories} ккал</p>
              </div>
            </div>
          </div>

          <Button
            className="w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold py-6"
            onClick={() => {
              onAddToDaily(recipe);
              onClose();
            }}
          >
            <Icon name="Plus" className="w-4 h-4 mr-2" />
            Добавить в дневное меню
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default RecipeModal;