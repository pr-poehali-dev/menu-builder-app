import { useState, useMemo, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { recipes, type Recipe, type RecipeCategory } from '@/lib/recipes-data';
import { ingredientsPrices, regions, type Region, type Allergen } from '@/lib/ingredients-data';
import { type Budget, getDefaultBudget } from '@/lib/budget-data';
import { type DietMode, dietModes } from '@/lib/diet-modes';
import { type CalendarMeal, type Reminder, generateWeekDates, defaultMealTimes, type MealTime } from '@/lib/calendar-data';
import IngredientsTab from '@/components/IngredientsTab';
import RecipesTab from '@/components/RecipesTab';
import CaloriesTab from '@/components/CaloriesTab';
import RecipeModal from '@/components/RecipeModal';
import RecipeCard from '@/components/RecipeCard';
import BudgetTab from '@/components/BudgetTab';
import CalendarTab from '@/components/CalendarTab';
import SettingsTab from '@/components/SettingsTab';

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
  
  const [budget, setBudget] = useState<Budget>(getDefaultBudget());
  const [excludedAllergens, setExcludedAllergens] = useState<Allergen[]>([]);
  const [dietMode, setDietMode] = useState<DietMode>('standard');
  const [calendarMeals, setCalendarMeals] = useState<CalendarMeal[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  
  useEffect(() => {
    const savedBudget = localStorage.getItem('budget');
    const savedAllergens = localStorage.getItem('excludedAllergens');
    const savedMode = localStorage.getItem('dietMode');
    const savedMeals = localStorage.getItem('calendarMeals');
    const savedReminders = localStorage.getItem('reminders');
    
    if (savedBudget) setBudget(JSON.parse(savedBudget));
    if (savedAllergens) setExcludedAllergens(JSON.parse(savedAllergens));
    if (savedMode) setDietMode(savedMode as DietMode);
    if (savedMeals) setCalendarMeals(JSON.parse(savedMeals));
    if (savedReminders) setReminders(JSON.parse(savedReminders));
  }, []);
  
  useEffect(() => {
    localStorage.setItem('budget', JSON.stringify(budget));
  }, [budget]);
  
  useEffect(() => {
    localStorage.setItem('excludedAllergens', JSON.stringify(excludedAllergens));
  }, [excludedAllergens]);
  
  useEffect(() => {
    localStorage.setItem('dietMode', dietMode);
  }, [dietMode]);
  
  useEffect(() => {
    localStorage.setItem('calendarMeals', JSON.stringify(calendarMeals));
  }, [calendarMeals]);
  
  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }, [reminders]);

  const addIngredient = () => {
    if (newIngredient.trim()) {
      const ingredientName = newIngredient.toLowerCase().trim();
      const priceData = ingredientsPrices.find(p => 
        p.name.toLowerCase().includes(ingredientName) || 
        ingredientName.includes(p.name.toLowerCase())
      );
      
      const price = priceData ? priceData.prices[region] : 0;
      
      const ingredient: UserIngredient = {
        id: Date.now().toString(),
        name: newIngredient,
        price,
        unit: priceData ? priceData.unit : '',
      };
      setIngredients([...ingredients, ingredient]);
      setBudget(prev => ({ ...prev, spent: prev.spent + price }));
      setNewIngredient('');
    }
  };
  
  const addMealToCalendar = (recipeId: string, recipeName: string, date: string, time: MealTime) => {
    const newMeal: CalendarMeal = {
      id: Date.now().toString(),
      date,
      time,
      recipeId,
      recipeName,
      completed: false
    };
    setCalendarMeals([...calendarMeals, newMeal]);
  };
  
  const toggleMealCompletion = (mealId: string) => {
    setCalendarMeals(prev => prev.map(meal => 
      meal.id === mealId ? { ...meal, completed: !meal.completed } : meal
    ));
  };
  
  const removeMealFromCalendar = (mealId: string) => {
    setCalendarMeals(prev => prev.filter(meal => meal.id !== mealId));
  };
  
  const addReminder = (title: string, date: string, time: string, type: 'meal' | 'workout' | 'custom', recipeId?: string) => {
    const newReminder: Reminder = {
      id: Date.now().toString(),
      date,
      time,
      title,
      type,
      enabled: true,
      recipeId
    };
    setReminders([...reminders, newReminder]);
  };
  
  const toggleReminder = (reminderId: string) => {
    setReminders(prev => prev.map(r => 
      r.id === reminderId ? { ...r, enabled: !r.enabled } : r
    ));
  };
  
  const removeReminder = (reminderId: string) => {
    setReminders(prev => prev.filter(r => r.id !== reminderId));
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
    
    const modeConfig = dietModes[dietMode];
    if (dietMode === 'express') {
      filtered = filtered.filter(r => r.time <= 30);
    }
    if (modeConfig.maxComplexity < 5) {
      filtered = filtered.filter(r => r.complexity <= modeConfig.maxComplexity);
    }
    if (dietMode === 'weight_loss') {
      filtered = filtered.filter(r => r.calories <= 400);
    }
    
    if (excludedAllergens.length > 0) {
      filtered = filtered.filter(recipe => {
        const recipeAllergens = new Set<Allergen>();
        
        recipe.ingredients.forEach(ing => {
          const ingData = ingredientsPrices.find(p => 
            p.name.toLowerCase() === ing.toLowerCase() || 
            ing.toLowerCase().includes(p.name.toLowerCase())
          );
          if (ingData?.allergens) {
            ingData.allergens.forEach(a => recipeAllergens.add(a));
          }
        });
        
        return !excludedAllergens.some(allergen => recipeAllergens.has(allergen));
      });
    }
    
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
  }, [searchQuery, selectedCategory, dietMode, excludedAllergens]);

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

  const modeGoals = dietModes[dietMode];
  const dailyCaloriesGoal = modeGoals.caloriesGoal;
  const dailyProteinGoal = modeGoals.proteinGoal;
  const dailyFatsGoal = modeGoals.fatsGoal;
  const dailyCarbsGoal = modeGoals.carbsGoal;

  const getTotalPrice = () => {
    return ingredients.reduce((sum, ing) => sum + ing.price, 0);
  };

  return (
    <div className="min-h-screen culinary-gradient food-pattern">
      <div className="max-w-md mx-auto p-4 pb-20">
        <div className="mb-6 text-center animate-fade-in">
          <div className="text-5xl mb-3">🍳</div>
          <h1 className="text-4xl font-heading font-extrabold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-2">
            МояКухня
          </h1>
          <p className="text-gray-600 text-sm font-medium">Современная кулинарная платформа</p>
        </div>

        <Card className="mb-4 p-4 glass-effect shadow-lg border-0 animate-scale-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Icon name="MapPin" className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-600 mb-1 font-medium">Ваш регион</p>
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

        <Tabs defaultValue="recipes" className="space-y-4">
          <TabsList className="grid w-full grid-cols-6 glass-effect shadow-md border-0 p-1 gap-1">
            <TabsTrigger value="recipes" className="text-[10px] data-[state=active]:bg-gradient-to-br data-[state=active]:from-violet-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg data-[state=active]:shadow-lg transition-all px-1">
              <Icon name="ChefHat" className="w-3 h-3" />
            </TabsTrigger>
            <TabsTrigger value="calendar" className="text-[10px] data-[state=active]:bg-gradient-to-br data-[state=active]:from-violet-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg data-[state=active]:shadow-lg transition-all px-1">
              <Icon name="Calendar" className="w-3 h-3" />
            </TabsTrigger>
            <TabsTrigger value="ingredients" className="text-[10px] data-[state=active]:bg-gradient-to-br data-[state=active]:from-violet-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg data-[state=active]:shadow-lg transition-all px-1">
              <Icon name="ShoppingBasket" className="w-3 h-3" />
            </TabsTrigger>
            <TabsTrigger value="budget" className="text-[10px] data-[state=active]:bg-gradient-to-br data-[state=active]:from-violet-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg data-[state=active]:shadow-lg transition-all px-1">
              <Icon name="Wallet" className="w-3 h-3" />
            </TabsTrigger>
            <TabsTrigger value="favorites" className="text-[10px] data-[state=active]:bg-gradient-to-br data-[state=active]:from-violet-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg data-[state=active]:shadow-lg transition-all px-1">
              <Icon name="Heart" className="w-3 h-3" />
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-[10px] data-[state=active]:bg-gradient-to-br data-[state=active]:from-violet-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg data-[state=active]:shadow-lg transition-all px-1">
              <Icon name="Settings" className="w-3 h-3" />
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

          <TabsContent value="budget">
            <BudgetTab
              budget={budget}
              setBudget={setBudget}
              currentSpent={getTotalPrice()}
            />
          </TabsContent>

          <TabsContent value="calendar">
            <CalendarTab
              meals={calendarMeals}
              reminders={reminders}
              recipes={recipes}
              addMeal={addMealToCalendar}
              toggleMealCompletion={toggleMealCompletion}
              removeMeal={removeMealFromCalendar}
              addReminder={addReminder}
              toggleReminder={toggleReminder}
              removeReminder={removeReminder}
              onSelectRecipe={setSelectedRecipe}
            />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsTab
              dietMode={dietMode}
              setDietMode={setDietMode}
              excludedAllergens={excludedAllergens}
              setExcludedAllergens={setExcludedAllergens}
            />
          </TabsContent>

          <TabsContent value="favorites" className="space-y-3">
            {favorites.length === 0 ? (
              <Card className="p-8 text-center bg-white/90 backdrop-blur-sm border-orange-200">
                <div className="text-5xl mb-3">❤️</div>
                <p className="text-gray-700 font-medium">Нет избранных рецептов</p>
                <p className="text-sm text-gray-500 mt-1">Добавьте понравившиеся рецепты</p>
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
        onAddToCalendar={addMealToCalendar}
      />
    </div>
  );
};

export default Index;