
import { apiClient } from './api';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
  relatedEntityId?: string;
  relatedEntityType?: 'training_request' | 'training_session' | 'trainer_invitation';
}

export interface CreateNotification {
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  relatedEntityId?: string;
  relatedEntityType?: 'training_request' | 'training_session' | 'trainer_invitation';
}

class NotificationService {
  async getNotifications(): Promise<Notification[]> {
    return apiClient.get<Notification[]>('/notifications');
  }

  async getUnreadCount(): Promise<number> {
    return apiClient.get<number>('/notifications/unread-count');
  }

  async markAsRead(notificationId: string): Promise<void> {
    return apiClient.post<void>(`/notifications/${notificationId}/read`);
  }

  async markAllAsRead(): Promise<void> {
    return apiClient.post<void>('/notifications/mark-all-read');
  }

  async deleteNotification(notificationId: string): Promise<void> {
    return apiClient.delete<void>(`/notifications/${notificationId}`);
  }

  async createNotification(notification: CreateNotification): Promise<Notification> {
    return apiClient.post<Notification>('/notifications', notification);
  }
}

export const notificationService = new NotificationService();
