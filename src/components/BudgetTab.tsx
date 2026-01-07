import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { type Budget, type BudgetPeriod, budgetPeriodLabels, calculateBudgetProgress, getBudgetStatus } from '@/lib/budget-data';

type BudgetTabProps = {
  budget: Budget;
  setBudget: (budget: Budget) => void;
  currentSpent: number;
};

const BudgetTab = ({ budget, setBudget, currentSpent }: BudgetTabProps) => {
  const progress = calculateBudgetProgress(budget);
  const status = getBudgetStatus(budget);
  const remaining = Math.max(0, budget.amount - budget.spent);

  const statusColors = {
    ok: 'bg-green-500',
    warning: 'bg-amber-500',
    exceeded: 'bg-red-500'
  };

  const statusIcons = {
    ok: '✅',
    warning: '⚠️',
    exceeded: '🚫'
  };

  return (
    <div className="space-y-3">
      <Card className="p-4 bg-white/95 backdrop-blur-sm border-orange-200 shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="Wallet" className="w-5 h-5 text-orange-600" />
          <h3 className="font-heading font-semibold text-lg text-gray-900">Бюджет на продукты</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-700 mb-2 block">Период</label>
            <Select 
              value={budget.period} 
              onValueChange={(v) => setBudget({ ...budget, period: v as BudgetPeriod })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(budgetPeriodLabels).map(([key, label]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-gray-700 mb-2 block">Лимит (₽)</label>
            <Input
              type="number"
              value={budget.amount}
              onChange={(e) => setBudget({ ...budget, amount: parseInt(e.target.value) || 0 })}
              min="0"
              step="100"
            />
          </div>

          <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">Израсходовано</span>
              <span className="text-2xl font-bold text-orange-600">{budget.spent} ₽</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2 overflow-hidden">
              <div 
                className={`h-full transition-all ${statusColors[status]}`}
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">{progress.toFixed(0)}% использовано</span>
              <span className={`font-medium ${status === 'exceeded' ? 'text-red-600' : 'text-green-600'}`}>
                {statusIcons[status]} {remaining > 0 ? `Осталось ${remaining} ₽` : 'Превышен'}
              </span>
            </div>
          </div>

          {currentSpent > 0 && (
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <div className="flex items-center gap-2 mb-1">
                <Icon name="ShoppingBasket" className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Текущая корзина</span>
              </div>
              <p className="text-lg font-bold text-blue-600">{currentSpent} ₽</p>
              <p className="text-xs text-blue-700 mt-1">
                {currentSpent > remaining ? 
                  `Превышение на ${currentSpent - remaining} ₽` : 
                  `В рамках бюджета`
                }
              </p>
            </div>
          )}

          <Button 
            onClick={() => setBudget({ ...budget, spent: 0 })}
            variant="outline"
            className="w-full border-orange-300 text-orange-900 hover:bg-orange-50"
          >
            <Icon name="RotateCcw" className="w-4 h-4 mr-2" />
            Сбросить счётчик
          </Button>
        </div>
      </Card>

      <Card className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
        <div className="flex items-start gap-3">
          <div className="text-2xl">💡</div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Совет</h4>
            <p className="text-sm text-gray-700">
              Добавляйте продукты в корзину, чтобы отслеживать траты в реальном времени. 
              Система автоматически посчитает стоимость рецептов.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BudgetTab;
