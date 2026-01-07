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
    className="p-0 glass-effect recipe-shadow hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border-0 group"
    onClick={() => onClick(recipe)}
  >
    <div className="relative overflow-hidden">
      <div className="h-48 bg-gradient-to-br from-violet-100 to-purple-100 overflow-hidden">
        <img 
          src={getRecipeImage(recipe.id)} 
          alt={recipe.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-3 right-3 h-10 w-10 rounded-full bg-white/90 backdrop-blur-md hover:bg-white shadow-lg border-0"
        onClick={(e) => {
          e.stopPropagation();
          onFavorite(recipe.id);
        }}
      >
        <Icon
          name="Heart"
          className={`w-5 h-5 transition-all ${isFavorite ? 'fill-red-500 text-red-500 scale-110' : 'text-gray-700'}`}
        />
      </Button>
    </div>
    <div className="p-5">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="font-heading font-bold text-xl text-gray-900 leading-tight">{recipe.name}</h3>
          </div>
          <div className="flex gap-2 flex-wrap mb-3">
            {matchBadge}
            {recipe.regional && (
              <Badge className="bg-gradient-to-r from-violet-500 to-purple-600 text-white border-0 text-xs font-medium rounded-full px-3 py-1">
                <Icon name="MapPin" className="w-3 h-3 mr-1" />
                {recipe.regional}
              </Badge>
            )}
            <Badge className="bg-blue-50 text-blue-700 border-0 text-xs font-medium rounded-full px-3 py-1">
              <Icon name="Clock" className="w-3 h-3 mr-1" />
              {recipe.time} мин
            </Badge>
            <Badge className="bg-green-50 text-green-700 border-0 text-xs font-medium rounded-full px-3 py-1">
              💰 {recipe.price}/5
            </Badge>
            <Badge className="bg-amber-50 text-amber-700 border-0 text-xs font-medium rounded-full px-3 py-1">
              ⚡ {recipe.complexity}/5
            </Badge>
            <Badge className="bg-red-50 text-red-700 border-0 text-xs font-medium rounded-full px-3 py-1">
              🔥 {recipe.calories} ккал
            </Badge>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{recipe.description}</p>
        </div>
      </div>
    </div>
  </Card>
);


export default RecipeCard;