import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { type Recipe, getRecipeImage } from '@/lib/recipes-data';

type RecipeCardProps = {
  recipe: Recipe;
  onClick: (recipe: Recipe) => void;
  onFavorite: (id: string) => void;
  isFavorite: boolean;
  matchBadge?: React.ReactNode;
};

const RecipeCard = ({ recipe, onClick, onFavorite, isFavorite, matchBadge }: RecipeCardProps) => (
  <Card
    className="p-0 bg-white/95 backdrop-blur-sm recipe-shadow hover:shadow-xl transition-all cursor-pointer overflow-hidden border-orange-200"
    onClick={() => onClick(recipe)}
  >
    <div className="relative">
      <div className="bg-gradient-to-br from-orange-100 to-amber-100 h-32 flex items-center justify-center">
        <span className="text-6xl">{getRecipeImage(recipe.id)}</span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-8 w-8 bg-white/80 backdrop-blur-sm hover:bg-white"
        onClick={(e) => {
          e.stopPropagation();
          onFavorite(recipe.id);
        }}
      >
        <Icon
          name="Heart"
          className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
        />
      </Button>
    </div>
    <div className="p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-heading font-semibold text-lg text-gray-900">{recipe.name}</h3>
          </div>
          <div className="flex gap-2 flex-wrap mb-2">
            {matchBadge}
            {recipe.regional && (
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0 text-xs">
                <Icon name="MapPin" className="w-3 h-3 mr-1" />
                {recipe.regional}
              </Badge>
            )}
            <Badge className="bg-orange-100 text-orange-900 border-orange-200 text-xs">
              <Icon name="Clock" className="w-3 h-3 mr-1" />
              {recipe.time} мин
            </Badge>
            <Badge className="bg-amber-100 text-amber-900 border-amber-200 text-xs">
              💰 {recipe.price}/5
            </Badge>
            <Badge className="bg-orange-50 text-orange-800 border-orange-200 text-xs">
              ⚡ {recipe.complexity}/5
            </Badge>
            <Badge className="bg-red-50 text-red-800 border-red-200 text-xs">
              🔥 {recipe.calories} ккал
            </Badge>
          </div>
          <p className="text-xs text-gray-600 line-clamp-2">{recipe.description}</p>
        </div>
      </div>
    </div>
  </Card>
);


export default RecipeCard;