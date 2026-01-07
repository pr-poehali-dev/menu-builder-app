import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { type Recipe } from '@/lib/recipes-data';

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
          {recipe.regional && (
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 text-xs">
              <Icon name="MapPin" className="w-3 h-3 mr-1" />
              {recipe.regional}
            </Badge>
          )}
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

export default RecipeCard;