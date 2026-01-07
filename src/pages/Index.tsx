import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { recipes, type Recipe, type RecipeCategory } from '@/lib/recipes-data';
import { ingredientsPrices, regions, type Region } from '@/lib/ingredients-data';
import IngredientsTab from '@/components/IngredientsTab';
import RecipesTab from '@/components/RecipesTab';
import CaloriesTab from '@/components/CaloriesTab';
import RecipeModal from '@/components/RecipeModal';
import RecipeCard from '@/components/RecipeCard';

type UserIngredient = {
  id: string;
  name: string;
  price: number;
  unit: string;
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<RecipeCategory | 'все'>('все');

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
        unit: priceData ? priceData.unit : '',
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

  const filteredRecipes = useMemo(() => {
    let filtered = recipes;
    
    if (selectedCategory !== 'все') {
      filtered = filtered.filter(r => r.category === selectedCategory);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(r => 
        r.name.toLowerCase().includes(query) ||
        r.description.toLowerCase().includes(query) ||
        r.ingredients.some(ing => ing.toLowerCase().includes(query))
      );
    }
    
    return filtered;
  }, [searchQuery, selectedCategory]);

  const sortedRecipes = useMemo(() => {
    return [...filteredRecipes].sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'simplicity') return a.complexity - b.complexity;
      return a.calories - b.calories;
    });
  }, [filteredRecipes, sortBy]);

  const fullMatchRecipes = useMemo(() => 
    sortedRecipes.filter(r => getRecipeMatchScore(r).full), 
    [sortedRecipes, ingredients]
  );
  
  const partialMatchRecipes = useMemo(() => 
    sortedRecipes
      .filter(r => {
        const score = getRecipeMatchScore(r);
        return !score.full && score.partial > 0;
      })
      .sort((a, b) => getRecipeMatchScore(b).partial - getRecipeMatchScore(a).partial),
    [sortedRecipes, ingredients]
  );

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

          <TabsContent value="ingredients">
            <IngredientsTab
              ingredients={ingredients}
              newIngredient={newIngredient}
              setNewIngredient={setNewIngredient}
              addIngredient={addIngredient}
              removeIngredient={removeIngredient}
              getTotalPrice={getTotalPrice}
              region={region}
            />
          </TabsContent>

          <TabsContent value="recipes">
            <RecipesTab
              sortBy={sortBy}
              setSortBy={setSortBy}
              ingredients={ingredients}
              fullMatchRecipes={fullMatchRecipes}
              partialMatchRecipes={partialMatchRecipes}
              sortedRecipes={sortedRecipes}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              setSelectedRecipe={setSelectedRecipe}
              getRecipeMatchScore={getRecipeMatchScore}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </TabsContent>

          <TabsContent value="calories">
            <CaloriesTab
              dailyCalories={dailyCalories}
              dailyProtein={dailyProtein}
              dailyFats={dailyFats}
              dailyCarbs={dailyCarbs}
              dailyCaloriesGoal={dailyCaloriesGoal}
              dailyProteinGoal={dailyProteinGoal}
              dailyFatsGoal={dailyFatsGoal}
              dailyCarbsGoal={dailyCarbsGoal}
              resetDaily={resetDaily}
            />
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

      <RecipeModal
        recipe={selectedRecipe}
        ingredients={ingredients}
        onClose={() => setSelectedRecipe(null)}
        onAddToDaily={addRecipeToDaily}
      />
    </div>
  );
};

export default Index;