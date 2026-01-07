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
      <Card className="p-4 bg-white/90 backdrop-blur-sm animate-scale-in">
        <div className="flex gap-2 mb-3 relative">
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              placeholder="Начните вводить ингредиент..."
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addIngredient()}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              className="w-full"
            />
            {showSuggestions && (
              <Card className="absolute top-full left-0 right-0 mt-1 z-50 max-h-60 overflow-y-auto shadow-lg">
                <div className="py-1">
                  {suggestions.map((ing) => (
                    <button
                      key={ing.name}
                      className="w-full px-4 py-2 text-left hover:bg-primary/10 transition-colors flex items-center justify-between"
                      onClick={() => selectSuggestion(ing.name)}
                    >
                      <div>
                        <p className="font-medium capitalize">{ing.name}</p>
                        <p className="text-xs text-muted-foreground">{ing.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-primary">{ing.prices[region]} ₽</p>
                        <p className="text-xs text-muted-foreground">{ing.unit}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </Card>
            )}
          </div>
          <Button onClick={addIngredient} size="icon" className="bg-gradient-to-r from-primary to-secondary">
            <Icon name="Plus" className="w-4 h-4" />
          </Button>
        </div>
        {ingredients.length > 0 && (
          <div className="pt-3 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Общая стоимость:</span>
              <span className="text-lg font-bold text-primary">{getTotalPrice()} ₽</span>
            </div>
          </div>
        )}
      </Card>

      <div className="space-y-2">
        {ingredients.length === 0 ? (
          <Card className="p-8 text-center bg-white/70 backdrop-blur-sm">
            <Icon name="ShoppingBasket" className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
            <p className="text-muted-foreground">Добавьте ингредиенты</p>
          </Card>
        ) : (
          ingredients.map((ing) => (
            <Card key={ing.id} className="p-4 bg-white/90 backdrop-blur-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold capitalize">{ing.name}</h3>
                  {ing.price > 0 && (
                    <div className="mt-1">
                      <p className="text-sm text-primary font-medium">
                        ~{ing.price} ₽
                      </p>
                      <p className="text-xs text-muted-foreground">{ing.unit}</p>
                    </div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeIngredient(ing.id)}
                  className="hover:bg-destructive/10 hover:text-destructive"
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