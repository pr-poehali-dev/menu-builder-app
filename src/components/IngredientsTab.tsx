import { useState, useMemo, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { ingredientsPrices, type Region } from '@/lib/ingredients-data';

type UserIngredient = {
  id: string;
  name: string;
  price: number;
  unit: string;
};

type IngredientsTabProps = {
  ingredients: UserIngredient[];
  newIngredient: string;
  setNewIngredient: (value: string) => void;
  addIngredient: () => void;
  removeIngredient: (id: string) => void;
  getTotalPrice: () => number;
  region: Region;
};

const IngredientsTab = ({
  ingredients,
  newIngredient,
  setNewIngredient,
  addIngredient,
  removeIngredient,
  getTotalPrice,
  region,
}: IngredientsTabProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = useMemo(() => {
    if (!newIngredient.trim()) return [];
    const query = newIngredient.toLowerCase();
    return ingredientsPrices
      .filter(ing => ing.name.toLowerCase().includes(query))
      .slice(0, 5);
  }, [newIngredient]);

  const selectSuggestion = (name: string) => {
    setNewIngredient(name);
    setShowSuggestions(false);
    addIngredient();
  };

  useEffect(() => {
    setShowSuggestions(suggestions.length > 0 && newIngredient.trim().length > 0);
  }, [suggestions, newIngredient]);

  return (
    <div className="space-y-3">
      <Card className="p-4 glass-effect animate-scale-in border-0 shadow-lg">
        <div className="flex gap-2 mb-3 relative">
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              placeholder="Начните вводить ингредиент..."
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addIngredient()}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              className="w-full border-gray-200 focus:border-violet-500 rounded-xl"
            />
            {showSuggestions && (
              <Card className="absolute top-full left-0 right-0 mt-1 z-50 max-h-60 overflow-y-auto shadow-2xl border-0 glass-effect">
                <div className="py-1">
                  {suggestions.map((ing) => (
                    <button
                      key={ing.name}
                      className="w-full px-4 py-3 text-left hover:bg-violet-50 transition-colors flex items-center justify-between border-b border-gray-100 last:border-0"
                      onClick={() => selectSuggestion(ing.name)}
                    >
                      <div>
                        <p className="font-semibold capitalize text-gray-900">{ing.name}</p>
                        <p className="text-xs text-violet-600 font-medium">{ing.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-violet-600">{ing.prices[region]} ₽</p>
                        <p className="text-xs text-gray-500">{ing.unit}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </Card>
            )}
          </div>
          <Button onClick={addIngredient} size="icon" className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 shadow-lg rounded-xl">
            <Icon name="Plus" className="w-4 h-4" />
          </Button>
        </div>
        {ingredients.length > 0 && (
          <div className="pt-3 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700 font-medium">Общая стоимость:</span>
              <span className="text-lg font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">{getTotalPrice()} ₽</span>
            </div>
          </div>
        )}
      </Card>

      <div className="space-y-2">
        {ingredients.length === 0 ? (
          <Card className="p-8 text-center glass-effect border-0 shadow-lg">
            <div className="text-5xl mb-3">🛒</div>
            <p className="text-gray-600 font-medium">Добавьте ингредиенты</p>
          </Card>
        ) : (
          ingredients.map((ing) => (
            <Card key={ing.id} className="p-4 glass-effect hover:shadow-xl transition-all border-0 group">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-bold capitalize text-gray-900">{ing.name}</h3>
                  {ing.price > 0 && (
                    <div className="mt-1">
                      <p className="text-sm text-violet-600 font-semibold">
                        ~{ing.price} ₽
                      </p>
                      <p className="text-xs text-gray-500">{ing.unit}</p>
                    </div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeIngredient(ing.id)}
                  className="hover:bg-red-50 hover:text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Icon name="Trash2" className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default IngredientsTab;