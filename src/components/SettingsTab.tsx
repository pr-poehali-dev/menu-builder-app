import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { type DietMode, dietModes } from '@/lib/diet-modes';
import { type Allergen } from '@/lib/ingredients-data';

type SettingsTabProps = {
  dietMode: DietMode;
  setDietMode: (mode: DietMode) => void;
  excludedAllergens: Allergen[];
  setExcludedAllergens: (allergens: Allergen[]) => void;
};

const allergensList: { value: Allergen; label: string; icon: string }[] = [
  { value: 'глютен', label: 'Глютен', icon: '🌾' },
  { value: 'лактоза', label: 'Лактоза', icon: '🥛' },
  { value: 'яйца', label: 'Яйца', icon: '🥚' },
  { value: 'орехи', label: 'Орехи', icon: '🥜' },
  { value: 'морепродукты', label: 'Морепродукты', icon: '🦐' },
  { value: 'соя', label: 'Соя', icon: '🫘' },
  { value: 'рыба', label: 'Рыба', icon: '🐟' },
  { value: 'кунжут', label: 'Кунжут', icon: '🌰' },
  { value: 'горчица', label: 'Горчица', icon: '🥫' },
  { value: 'сельдерей', label: 'Сельдерей', icon: '🥬' }
];

const SettingsTab = ({ dietMode, setDietMode, excludedAllergens, setExcludedAllergens }: SettingsTabProps) => {
  const toggleAllergen = (allergen: Allergen) => {
    if (excludedAllergens.includes(allergen)) {
      setExcludedAllergens(excludedAllergens.filter(a => a !== allergen));
    } else {
      setExcludedAllergens([...excludedAllergens, allergen]);
    }
  };

  const currentMode = dietModes[dietMode];

  return (
    <div className="space-y-3">
      <Card className="p-4 bg-white/95 backdrop-blur-sm border-orange-200 shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="Settings" className="w-5 h-5 text-orange-600" />
          <h3 className="font-heading font-semibold text-lg text-gray-900">Режим питания</h3>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {Object.values(dietModes).map(mode => {
            const isActive = mode.id === dietMode;
            return (
              <button
                key={mode.id}
                onClick={() => setDietMode(mode.id)}
                className={`p-3 rounded-lg text-left transition-all border-2 ${
                  isActive 
                    ? 'bg-orange-50 border-orange-500 shadow-md' 
                    : 'bg-white border-gray-200 hover:border-orange-300 hover:bg-orange-50/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{mode.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={`font-semibold ${isActive ? 'text-orange-900' : 'text-gray-900'}`}>
                        {mode.name}
                      </h4>
                      {isActive && (
                        <Badge className="bg-orange-500 text-white text-xs">
                          Активен
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{mode.description}</p>
                    <div className="flex flex-wrap gap-1">
                      <Badge className="bg-red-50 text-red-700 border-red-200 text-[10px]">
                        {mode.caloriesGoal} ккал
                      </Badge>
                      <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-[10px]">
                        Б: {mode.proteinGoal}г
                      </Badge>
                      <Badge className="bg-amber-50 text-amber-700 border-amber-200 text-[10px]">
                        Ж: {mode.fatsGoal}г
                      </Badge>
                      <Badge className="bg-green-50 text-green-700 border-green-200 text-[10px]">
                        У: {mode.carbsGoal}г
                      </Badge>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </Card>

      <Card className="p-4 bg-white/95 backdrop-blur-sm border-orange-200 shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="ShieldAlert" className="w-5 h-5 text-red-600" />
          <h3 className="font-heading font-semibold text-lg text-gray-900">Аллергены</h3>
        </div>

        <p className="text-sm text-gray-600 mb-3">
          Выберите продукты, которые нужно исключить из рецептов
        </p>

        <div className="grid grid-cols-2 gap-2">
          {allergensList.map(allergen => {
            const isExcluded = excludedAllergens.includes(allergen.value);
            return (
              <button
                key={allergen.value}
                onClick={() => toggleAllergen(allergen.value)}
                className={`p-3 rounded-lg text-left transition-all border-2 ${
                  isExcluded 
                    ? 'bg-red-50 border-red-500 shadow-md' 
                    : 'bg-white border-gray-200 hover:border-red-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{allergen.icon}</span>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${isExcluded ? 'text-red-900' : 'text-gray-900'}`}>
                      {allergen.label}
                    </p>
                    {isExcluded && (
                      <p className="text-[10px] text-red-600">Исключён</p>
                    )}
                  </div>
                  {isExcluded && (
                    <Icon name="X" className="w-4 h-4 text-red-600" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {excludedAllergens.length > 0 && (
          <div className="mt-3 p-3 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-start gap-2">
              <Icon name="AlertCircle" className="w-4 h-4 text-red-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-900">Исключено: {excludedAllergens.length}</p>
                <p className="text-xs text-red-700 mt-1">
                  Рецепты с этими ингредиентами будут скрыты
                </p>
              </div>
            </div>
          </div>
        )}
      </Card>

      <Card className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{currentMode.icon}</span>
          <h4 className="font-semibold text-gray-900">Текущий режим</h4>
        </div>
        <p className="text-sm text-gray-700 mb-3">{currentMode.name}</p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white/70 rounded p-2">
            <p className="text-gray-600">Калории/день</p>
            <p className="text-lg font-bold text-orange-600">{currentMode.caloriesGoal}</p>
          </div>
          <div className="bg-white/70 rounded p-2">
            <p className="text-gray-600">Макс. сложность</p>
            <p className="text-lg font-bold text-orange-600">{currentMode.maxComplexity}/5</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SettingsTab;
