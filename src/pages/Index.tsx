import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { recipes, type Recipe } from '@/lib/recipes-data';
import { ingredientsPrices, regions, type Region } from '@/lib/ingredients-data';

type UserIngredient = {
  id: string;
  name: string;
  price: number;
};

type SortOption = 'price' | 'simplicity' | 'calories';

const Index = () => {
  const [region, setRegion] = useState<Region>('moscow');
  const [ingredients, setIngredients] = useState<UserIngredient[]>([]);
  const [newIngredient, setNewIngredient] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('simplicity');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [dailyCalories, setDailyCalories] = useState(0);
  const [dailyProtein, setDailyProtein] = useState(0);
  const [dailyFats, setDailyFats] = useState(0);
  const [dailyCarbs, setDailyCarbs] = useState(0);

  const addIngredient = () => {
    if (newIngredient.trim()) {
      const ingredientName = newIngredient.toLowerCase().trim();
      const priceData = ingredientsPrices.find(p => 
        p.name.toLowerCase().includes(ingredientName) || 
        ingredientName.includes(p.name.toLowerCase())
      );
      
      const ingredient: UserIngredient = {
        id: Date.now().toString(),
        name: newIngredient,
        price: priceData ? priceData.prices[region] : 0,
      };
      setIngredients([...ingredients, ingredient]);
      setNewIngredient('');
    }
  };

  const removeIngredient = (id: string) => {
    setIngredients(ingredients.filter(ing => ing.id !== id));
  };

  const toggleFavorite = (recipeId: string) => {
    setFavorites(prev =>
      prev.includes(recipeId)
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  const addRecipeToDaily = (recipe: Recipe) => {
    setDailyCalories(prev => prev + recipe.calories);
    setDailyProtein(prev => prev + recipe.protein);
    setDailyFats(prev => prev + recipe.fats);
    setDailyCarbs(prev => prev + recipe.carbs);
  };

  const resetDaily = () => {
    setDailyCalories(0);
    setDailyProtein(0);
    setDailyFats(0);
    setDailyCarbs(0);
  };

  const getRecipeMatchScore = (recipe: Recipe): { full: boolean; partial: number } => {
    if (ingredients.length === 0) return { full: false, partial: 0 };
    
    let matchCount = 0;
    for (const recipeIng of recipe.ingredients) {
      const found = ingredients.some(userIng =>
        userIng.name.toLowerCase().includes(recipeIng.toLowerCase()) ||
        recipeIng.toLowerCase().includes(userIng.name.toLowerCase())
      );
      if (found) matchCount++;
    }
    
    const full = matchCount === recipe.ingredients.length;
    return { full, partial: matchCount };
  };

  const sortedRecipes = [...recipes].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'simplicity') return a.complexity - b.complexity;
    return a.calories - b.calories;
  });

  const fullMatchRecipes = sortedRecipes.filter(r => getRecipeMatchScore(r).full);
  const partialMatchRecipes = sortedRecipes.filter(r => {
    const score = getRecipeMatchScore(r);
    return !score.full && score.partial > 0;
  }).sort((a, b) => getRecipeMatchScore(b).partial - getRecipeMatchScore(a).partial);

  const dailyCaloriesGoal = 2000;
  const dailyProteinGoal = 150;
  const dailyFatsGoal = 70;
  const dailyCarbsGoal = 250;

  const getTotalPrice = () => {
    return ingredients.reduce((sum, ing) => sum + ing.price, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="max-w-md mx-auto p-4 pb-20">
        <div className="mb-6 text-center animate-fade-in">
          <h1 className="text-4xl font-heading font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2">
            МояКухня
          </h1>
          <p className="text-muted-foreground">Твой персональный помощник</p>
        </div>

        <Card className="mb-4 p-4 bg-white/90 backdrop-blur-sm animate-scale-in">
          <div className="flex items-center gap-3">
            <Icon name="MapPin" className="w-5 h-5 text-primary" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground mb-1">Ваш регион</p>
              <Select value={region} onValueChange={(v) => setRegion(v as Region)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(regions).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="ingredients" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="ingredients" className="text-xs">
              <Icon name="Salad" className="w-4 h-4 mr-1" />
              Продукты
            </TabsTrigger>
            <TabsTrigger value="recipes" className="text-xs">
              <Icon name="ChefHat" className="w-4 h-4 mr-1" />
              Рецепты
            </TabsTrigger>
            <TabsTrigger value="calories" className="text-xs">
              <Icon name="Activity" className="w-4 h-4 mr-1" />
              Калории
            </TabsTrigger>
            <TabsTrigger value="favorites" className="text-xs">
              <Icon name="Heart" className="w-4 h-4 mr-1" />
              Избранное
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ingredients" className="space-y-3">
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
          </TabsContent>

          <TabsContent value="recipes" className="space-y-3">
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
          </TabsContent>

          <TabsContent value="calories" className="space-y-3">
            <Card className="p-4 bg-white/90 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-semibold text-lg">Дневная норма</h3>
                <Button variant="outline" size="sm" onClick={resetDaily}>
                  <Icon name="RotateCcw" className="w-3 h-3 mr-1" />
                  Сбросить
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Калории</span>
                    <span className="text-sm font-semibold">
                      {dailyCalories} / {dailyCaloriesGoal} ккал
                    </span>
                  </div>
                  <Progress value={(dailyCalories / dailyCaloriesGoal) * 100} className="h-3" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Белки</span>
                    <span className="text-sm font-semibold">
                      {dailyProtein} / {dailyProteinGoal} г
                    </span>
                  </div>
                  <Progress value={(dailyProtein / dailyProteinGoal) * 100} className="h-2 [&>div]:bg-blue-500" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Жиры</span>
                    <span className="text-sm font-semibold">
                      {dailyFats} / {dailyFatsGoal} г
                    </span>
                  </div>
                  <Progress value={(dailyFats / dailyFatsGoal) * 100} className="h-2 [&>div]:bg-yellow-500" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Углеводы</span>
                    <span className="text-sm font-semibold">
                      {dailyCarbs} / {dailyCarbsGoal} г
                    </span>
                  </div>
                  <Progress value={(dailyCarbs / dailyCarbsGoal) * 100} className="h-2 [&>div]:bg-green-500" />
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                    {Math.round((dailyCalories / dailyCaloriesGoal) * 100)}%
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Прогресс за день</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {dailyCalories < dailyCaloriesGoal * 0.5
                        ? 'Добавьте больше блюд'
                        : dailyCalories > dailyCaloriesGoal
                        ? 'Норма превышена'
                        : 'Отличный прогресс!'}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-3">
            {favorites.length === 0 ? (
              <Card className="p-8 text-center bg-white/70 backdrop-blur-sm">
                <Icon name="Heart" className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">Нет избранных рецептов</p>
                <p className="text-sm text-muted-foreground mt-1">Добавьте понравившиеся рецепты</p>
              </Card>
            ) : (
              recipes
                .filter((r) => favorites.includes(r.id))
                .map((recipe) => (
                  <RecipeCard 
                    key={recipe.id} 
                    recipe={recipe} 
                    onClick={setSelectedRecipe}
                    onFavorite={toggleFavorite}
                    isFavorite={true}
                  />
                ))
            )}
          </TabsContent>
        </Tabs>
      </div>

      {selectedRecipe && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end justify-center z-50 animate-fade-in"
          onClick={() => setSelectedRecipe(null)}
        >
          <Card
            className="w-full max-w-md max-h-[85vh] overflow-y-auto bg-white rounded-t-3xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gradient-to-r from-primary to-secondary text-white p-6 rounded-t-3xl z-10">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="font-heading font-bold text-2xl mb-2">{selectedRecipe.name}</h2>
                  <div className="flex gap-2 flex-wrap">
                    <Badge className="bg-white/20 text-white border-0">
                      <Icon name="Clock" className="w-3 h-3 mr-1" />
                      {selectedRecipe.time} мин
                    </Badge>
                    <Badge className="bg-white/20 text-white border-0">
                      🔥 {selectedRecipe.calories} ккал
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={() => setSelectedRecipe(null)}
                >
                  <Icon name="X" className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="font-heading font-semibold text-lg mb-3">Описание</h3>
                <p className="text-sm text-muted-foreground">{selectedRecipe.description}</p>
              </div>

              <div>
                <h3 className="font-heading font-semibold text-lg mb-3">Ингредиенты</h3>
                <ul className="space-y-2">
                  {selectedRecipe.ingredients.map((ing, idx) => {
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
                  {selectedRecipe.steps.map((step, idx) => (
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
                    <p className="font-semibold">{selectedRecipe.protein} г</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Жиры</p>
                    <p className="font-semibold">{selectedRecipe.fats} г</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Углеводы</p>
                    <p className="font-semibold">{selectedRecipe.carbs} г</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Калории</p>
                    <p className="font-semibold">{selectedRecipe.calories} ккал</p>
                  </div>
                </div>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold py-6"
                onClick={() => {
                  addRecipeToDaily(selectedRecipe);
                  setSelectedRecipe(null);
                }}
              >
                <Icon name="Plus" className="w-4 h-4 mr-2" />
                Добавить в дневное меню
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

type RecipeCardProps = {
  recipe: Recipe;
  onClick: (recipe: Recipe) => void;
  onFavorite: (id: string) => void;
  isFavorite: boolean;
  matchBadge?: React.ReactNode;
};

const RecipeCard = ({ recipe, onClick, onFavorite, isFavorite, matchBadge }: RecipeCardProps) => (
  <Card
    className="p-4 bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all cursor-pointer"
    onClick={() => onClick(recipe)}
  >
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="font-heading font-semibold text-lg">{recipe.name}</h3>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={(e) => {
              e.stopPropagation();
              onFavorite(recipe.id);
            }}
          >
            <Icon
              name="Heart"
              className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`}
            />
          </Button>
        </div>
        <div className="flex gap-2 flex-wrap mb-2">
          {matchBadge}
          <Badge variant="secondary" className="text-xs">
            <Icon name="Clock" className="w-3 h-3 mr-1" />
            {recipe.time} мин
          </Badge>
          <Badge variant="outline" className="text-xs">
            💰 {recipe.price}/5
          </Badge>
          <Badge variant="outline" className="text-xs">
            ⚡ {recipe.complexity}/5
          </Badge>
          <Badge variant="outline" className="text-xs">
            🔥 {recipe.calories} ккал
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2">{recipe.description}</p>
      </div>
    </div>
  </Card>
);

export default Index;
