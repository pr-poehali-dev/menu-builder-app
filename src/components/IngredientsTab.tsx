import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

type UserIngredient = {
  id: string;
  name: string;
  price: number;
};

type IngredientsTabProps = {
  ingredients: UserIngredient[];
  newIngredient: string;
  setNewIngredient: (value: string) => void;
  addIngredient: () => void;
  removeIngredient: (id: string) => void;
  getTotalPrice: () => number;
};

const IngredientsTab = ({
  ingredients,
  newIngredient,
  setNewIngredient,
  addIngredient,
  removeIngredient,
  getTotalPrice,
}: IngredientsTabProps) => {
  return (
    <div className="space-y-3">
      <Card className="p-4 bg-white/90 backdrop-blur-sm animate-scale-in">
        <div className="flex gap-2 mb-3">
          <Input
            placeholder="Добавить ингредиент..."
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addIngredient()}
            className="flex-1"
          />
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
                    <p className="text-sm text-primary font-medium mt-1">
                      ~{ing.price} ₽
                    </p>
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
