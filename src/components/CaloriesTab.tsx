import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

type CaloriesTabProps = {
  dailyCalories: number;
  dailyProtein: number;
  dailyFats: number;
  dailyCarbs: number;
  dailyCaloriesGoal: number;
  dailyProteinGoal: number;
  dailyFatsGoal: number;
  dailyCarbsGoal: number;
  resetDaily: () => void;
};

const CaloriesTab = ({
  dailyCalories,
  dailyProtein,
  dailyFats,
  dailyCarbs,
  dailyCaloriesGoal,
  dailyProteinGoal,
  dailyFatsGoal,
  dailyCarbsGoal,
  resetDaily,
}: CaloriesTabProps) => {
  return (
    <div className="space-y-3">
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
    </div>
  );
};

export default CaloriesTab;
