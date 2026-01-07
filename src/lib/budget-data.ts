export type BudgetPeriod = 'day' | 'week' | 'month';

export type Budget = {
  amount: number;
  period: BudgetPeriod;
  spent: number;
};

export const budgetPeriodLabels: Record<BudgetPeriod, string> = {
  day: 'День',
  week: 'Неделя',
  month: 'Месяц'
};

export const getDefaultBudget = (): Budget => ({
  amount: 5000,
  period: 'week',
  spent: 0
});

export const calculateBudgetProgress = (budget: Budget): number => {
  if (budget.amount === 0) return 0;
  return Math.min((budget.spent / budget.amount) * 100, 100);
};

export const getBudgetStatus = (budget: Budget): 'ok' | 'warning' | 'exceeded' => {
  const progress = calculateBudgetProgress(budget);
  if (progress >= 100) return 'exceeded';
  if (progress >= 80) return 'warning';
  return 'ok';
};
