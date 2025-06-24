
import { apiClient } from './api';
import { ReportFilters, TrainingReport } from '../types/api';

class ReportsService {
  async getTrainingReport(filters: ReportFilters): Promise<TrainingReport> {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });

    return apiClient.get<TrainingReport>(`/reports/training?${queryParams.toString()}`);
  }

  async exportReport(filters: ReportFilters, format: 'excel' | 'pdf' | 'csv'): Promise<Blob> {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
    queryParams.append('format', format);

    const response = await fetch(`${process.env.REACT_APP_API_URL}/reports/export?${queryParams.toString()}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to export report');
    }

    return response.blob();
  }

  async getDashboardStats(): Promise<{
    totalRequests: number;
    pendingRequests: number;
    approvedRequests: number;
    completedTrainings: number;
    scheduledSessions: number;
    activeTrainers: number;
  }> {
    return apiClient.get('/reports/dashboard-stats');
  }
}

export const reportsService = new ReportsService();
