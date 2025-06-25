
import { useState } from 'react';
import { ArrowLeft, Bell, CheckCircle, AlertCircle, Info, X } from 'lucide-react';

interface NotificationsListProps {
  onBack: () => void;
}

export const NotificationsList = ({ onBack }: NotificationsListProps) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Training Request Approved',
      message: 'Your React Advanced Concepts training request has been approved by L&D team.',
      type: 'success' as const,
      isRead: false,
      createdAt: '2024-06-20T10:30:00Z'
    },
    {
      id: 2,
      title: 'New Training Available',
      message: 'A new Cloud Computing Basics training session is now available for booking.',
      type: 'info' as const,
      isRead: false,
      createdAt: '2024-06-19T14:15:00Z'
    },
    {
      id: 3,
      title: 'Training Reminder',
      message: 'Your Project Management training is scheduled for tomorrow at 2:00 PM.',
      type: 'warning' as const,
      isRead: true,
      createdAt: '2024-06-18T09:00:00Z'
    }
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return CheckCircle;
      case 'warning':
        return AlertCircle;
      case 'error':
        return X;
      default:
        return Info;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-600 bg-green-100';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100';
      case 'error':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-blue-600 bg-blue-100';
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>
        
        <button
          onClick={markAllAsRead}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          Mark all as read
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Bell className="w-6 h-6 text-gray-700" />
          <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
        </div>
        
        <div className="space-y-4">
          {notifications.map((notification) => {
            const Icon = getIcon(notification.type);
            return (
              <div
                key={notification.id}
                className={`border border-gray-200 rounded-lg p-4 ${
                  !notification.isRead ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${getTypeColor(notification.type)}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                      {!notification.isRead && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs text-blue-600 hover:text-blue-700"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                    <p className="text-gray-600 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(notification.createdAt).toLocaleDateString()} at{' '}
                      {new Date(notification.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
