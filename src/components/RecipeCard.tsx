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
    className="overflow-hidden bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all cursor-pointer"
    onClick={() => onClick(recipe)}
  >
    <div className="flex gap-3">
      <div className="relative w-24 h-24 flex-shrink-0">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-full object-cover rounded-l-lg"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400';
          }}
        />
      </div>
      <div className="flex-1 py-2 pr-4">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-heading font-semibold text-base line-clamp-1">{recipe.name}</h3>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 flex-shrink-0"
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
        <div className="flex gap-1 flex-wrap mb-1">
          {matchBadge}
          <Badge variant="secondary" className="text-xs py-0 h-5">
            <Icon name="Clock" className="w-3 h-3 mr-1" />
            {recipe.time} мин
          </Badge>
          <Badge variant="outline" className="text-xs py-0 h-5">
            💰 {recipe.price}/5
          </Badge>
          <Badge variant="outline" className="text-xs py-0 h-5">
            🔥 {recipe.calories}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-1">{recipe.description}</p>
      </div>
    </div>
  </Card>
);

export default RecipeCard;