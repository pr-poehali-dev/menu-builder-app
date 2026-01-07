export type NotificationType = 'meal' | 'reminder' | 'achievement' | 'recipe';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  icon?: string;
  data?: Record<string, unknown>;
  timestamp: number;
  read: boolean;
}

export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    console.log('Уведомления не поддерживаются');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};

export const showNotification = async (notification: Omit<AppNotification, 'id' | 'timestamp' | 'read'>): Promise<void> => {
  const hasPermission = await requestNotificationPermission();
  
  if (!hasPermission) {
    console.log('Нет разрешения на уведомления');
    return;
  }

  const notificationOptions: NotificationOptions = {
    body: notification.body,
    icon: notification.icon || '/icon.png',
    badge: '/badge.png',
    tag: notification.type,
    data: notification.data,
    requireInteraction: false,
    silent: false,
  };

  try {
    new Notification(notification.title, notificationOptions);
  } catch (error) {
    console.error('Ошибка показа уведомления:', error);
  }
};

export const scheduleNotification = (
  notification: Omit<AppNotification, 'id' | 'timestamp' | 'read'>,
  delayMs: number
): NodeJS.Timeout => {
  return setTimeout(() => {
    showNotification(notification);
  }, delayMs);
};

export const createMealNotification = (mealName: string, time: string): Omit<AppNotification, 'id' | 'timestamp' | 'read'> => ({
  type: 'meal',
  title: '⏰ Напоминание о приёме пищи',
  body: `Пора готовить: ${mealName}`,
  icon: '🍽️',
  data: { mealName, time }
});

export const createRecipeNotification = (recipeName: string): Omit<AppNotification, 'id' | 'timestamp' | 'read'> => ({
  type: 'recipe',
  title: '✨ Новый рецепт',
  body: `Попробуйте приготовить: ${recipeName}`,
  icon: '👨‍🍳',
  data: { recipeName }
});

export const createAchievementNotification = (achievement: string): Omit<AppNotification, 'id' | 'timestamp' | 'read'> => ({
  type: 'achievement',
  title: '🎉 Достижение разблокировано!',
  body: achievement,
  icon: '🏆',
  data: { achievement }
});

export const getNotificationTimeOffset = (targetTime: string): number => {
  const [hours, minutes] = targetTime.split(':').map(Number);
  const now = new Date();
  const target = new Date();
  
  target.setHours(hours, minutes, 0, 0);
  
  if (target < now) {
    target.setDate(target.getDate() + 1);
  }
  
  return target.getTime() - now.getTime();
};
