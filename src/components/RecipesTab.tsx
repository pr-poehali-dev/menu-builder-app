import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { type Recipe, type RecipeCategory } from '@/lib/recipes-data';
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
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedCategory: RecipeCategory | 'все';
  setSelectedCategory: (value: RecipeCategory | 'все') => void;
  maxTime: number;
  setMaxTime: (value: number) => void;
  maxPrice: number;
  setMaxPrice: (value: number) => void;
  maxComplexity: number;
  setMaxComplexity: (value: number) => void;
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
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  maxTime,
  setMaxTime,
  maxPrice,
  setMaxPrice,
  maxComplexity,
  setMaxComplexity,
}: RecipesTabProps) => {
  const categories: Array<RecipeCategory | 'все'> = ['все', 'завтрак', 'обед', 'ужин', 'десерт', 'выпечка', 'супы', 'салаты', 'напитки', 'закуски'];

  return (
    <div className="space-y-3">
      <Card className="p-4 bg-white/90 backdrop-blur-sm space-y-3">
        <div className="relative">
          <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Поиск рецептов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-muted-foreground mb-2">Категория</p>
            <Select value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as RecipeCategory | 'все')}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat} className="capitalize">
                    {cat === 'все' ? 'Все категории' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2">Время: до {maxTime} мин</p>
            <Input
              type="range"
              min="5"
              max="180"
              step="5"
              value={maxTime}
              onChange={(e) => setMaxTime(Number(e.target.value))}
              className="h-8"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-muted-foreground mb-2">Цена: до {maxPrice}/5</p>
            <Input
              type="range"
              min="1"
              max="5"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="h-8"
            />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2">Сложность: до {maxComplexity}/5</p>
            <Input
              type="range"
              min="1"
              max="5"
              value={maxComplexity}
              onChange={(e) => setMaxComplexity(Number(e.target.value))}
              className="h-8"
            />
          </div>
        </div>
        
        <div>
          <p className="text-xs text-muted-foreground mb-2">Сортировка</p>
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
        </div>
      </Card>

      {sortedRecipes.length === 0 && (
        <Card className="p-8 text-center bg-white/70 backdrop-blur-sm">
          <Icon name="Search" className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
          <p className="text-muted-foreground">Ничего не найдено</p>
          <p className="text-sm text-muted-foreground mt-1">Попробуйте изменить поиск</p>
        </Card>
      )}

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