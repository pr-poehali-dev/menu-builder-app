import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { type Recipe } from '@/lib/recipes-data';
import RecipeCard from './RecipeCard';

type UserIngredient = {
  id: string;
  name: string;
  price: number;
};

type SortOption = 'price' | 'simplicity' | 'calories';

type RecipesTabProps = {
  sortBy: SortOption;
  setSortBy: (value: SortOption) => void;
  ingredients: UserIngredient[];
  fullMatchRecipes: Recipe[];
  partialMatchRecipes: Recipe[];
  sortedRecipes: Recipe[];
  favorites: string[];
  toggleFavorite: (id: string) => void;
  setSelectedRecipe: (recipe: Recipe) => void;
  getRecipeMatchScore: (recipe: Recipe) => { full: boolean; partial: number };
};

const RecipesTab = ({
  sortBy,
  setSortBy,
  ingredients,
  fullMatchRecipes,
  partialMatchRecipes,
  sortedRecipes,
  favorites,
  toggleFavorite,
  setSelectedRecipe,
  getRecipeMatchScore,
}: RecipesTabProps) => {
  return (
    <div className="space-y-3">
      <Card className="p-4 bg-white/90 backdrop-blur-sm">
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={sortBy === 'price' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('price')}
            className={sortBy === 'price' ? 'bg-gradient-to-r from-primary to-secondary' : ''}
          >
            <Icon name="DollarSign" className="w-3 h-3 mr-1" />
            Цена
          </Button>
          <Button
            variant={sortBy === 'simplicity' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('simplicity')}
            className={sortBy === 'simplicity' ? 'bg-gradient-to-r from-primary to-secondary' : ''}
          >
            <Icon name="Zap" className="w-3 h-3 mr-1" />
            Простота
          </Button>
          <Button
            variant={sortBy === 'calories' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('calories')}
            className={sortBy === 'calories' ? 'bg-gradient-to-r from-primary to-secondary' : ''}
          >
            <Icon name="Flame" className="w-3 h-3 mr-1" />
            Калории
          </Button>
        </div>
      </Card>

      {ingredients.length > 0 && fullMatchRecipes.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 px-2">
            <Icon name="CheckCircle2" className="w-5 h-5 text-green-600" />
            <h3 className="font-heading font-semibold text-lg text-green-700">
              Можно приготовить сейчас
            </h3>
          </div>
          {fullMatchRecipes.map((recipe) => (
            <RecipeCard 
              key={recipe.id} 
              recipe={recipe} 
              onClick={setSelectedRecipe}
              onFavorite={toggleFavorite}
              isFavorite={favorites.includes(recipe.id)}
              matchBadge={<Badge className="bg-green-500 text-white border-0">Все есть!</Badge>}
            />
          ))}
        </div>
      )}

      {ingredients.length > 0 && partialMatchRecipes.length > 0 && (
        <div className="space-y-2 mt-4">
          <div className="flex items-center gap-2 px-2">
            <Icon name="Sparkles" className="w-5 h-5 text-orange-600" />
            <h3 className="font-heading font-semibold text-lg text-orange-700">
              Почти готово
            </h3>
          </div>
          {partialMatchRecipes.map((recipe) => {
            const score = getRecipeMatchScore(recipe);
            return (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe} 
                onClick={setSelectedRecipe}
                onFavorite={toggleFavorite}
                isFavorite={favorites.includes(recipe.id)}
                matchBadge={
                  <Badge variant="outline" className="border-orange-400 text-orange-600">
                    {score.partial}/{recipe.ingredients.length} есть
                  </Badge>
                }
              />
            );
          })}
        </div>
      )}

      {ingredients.length === 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 px-2">
            <Icon name="List" className="w-5 h-5 text-primary" />
            <h3 className="font-heading font-semibold text-lg">Все рецепты</h3>
          </div>
          {sortedRecipes.map((recipe) => (
            <RecipeCard 
              key={recipe.id} 
              recipe={recipe} 
              onClick={setSelectedRecipe}
              onFavorite={toggleFavorite}
              isFavorite={favorites.includes(recipe.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipesTab;
