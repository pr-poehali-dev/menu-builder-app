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
        <div className="relative">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-48 object-cover rounded-t-3xl"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800';
            }}
          />
          <div className="absolute top-4 right-4">
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/90 hover:bg-white text-gray-900 rounded-full"
              onClick={onClose}
            >
              <Icon name="X" className="w-5 h-5" />
            </Button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <h2 className="font-heading font-bold text-2xl text-white mb-2">{recipe.name}</h2>
            <div className="flex gap-2 flex-wrap">
              <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
                <Icon name="Clock" className="w-3 h-3 mr-1" />
                {recipe.time} мин
              </Badge>
              <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
                🔥 {recipe.calories} ккал
              </Badge>
              <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
                💰 {recipe.price}/5
              </Badge>
            </div>
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
              {recipe.steps.map((step, idx) => (
                <li key={idx} className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </div>
                  <p className="text-sm flex-1">{step}</p>
                </li>
              ))}
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