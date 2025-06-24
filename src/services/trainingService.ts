
import { apiClient } from './api';
import { 
  TrainingRequest, 
  CreateTrainingRequest, 
  TrainingSession, 
  PaginatedResponse 
} from '../types/api';

class TrainingService {
  // Training Requests
  async getTrainingRequests(page = 1, limit = 10): Promise<PaginatedResponse<TrainingRequest>> {
    return apiClient.get<PaginatedResponse<TrainingRequest>>(`/training-requests?page=${page}&limit=${limit}`);
  }

  async getMyTrainingRequests(): Promise<TrainingRequest[]> {
    return apiClient.get<TrainingRequest[]>('/training-requests/my-requests');
  }

  async getTrainingRequest(id: string): Promise<TrainingRequest> {
    return apiClient.get<TrainingRequest>(`/training-requests/${id}`);
  }

  async createTrainingRequest(request: CreateTrainingRequest): Promise<TrainingRequest> {
    return apiClient.post<TrainingRequest>('/training-requests', request);
  }

  async updateTrainingRequest(id: string, request: Partial<CreateTrainingRequest>): Promise<TrainingRequest> {
    return apiClient.put<TrainingRequest>(`/training-requests/${id}`, request);
  }

  async approveTrainingRequest(id: string, approvalType: 'tech' | 'finance'): Promise<TrainingRequest> {
    return apiClient.post<TrainingRequest>(`/training-requests/${id}/approve`, { approvalType });
  }

  async rejectTrainingRequest(id: string, reason: string): Promise<TrainingRequest> {
    return apiClient.post<TrainingRequest>(`/training-requests/${id}/reject`, { reason });
  }

  // Training Sessions
  async getTrainingSessions(): Promise<TrainingSession[]> {
    return apiClient.get<TrainingSession[]>('/training-sessions');
  }

  async getMyTrainingSessions(): Promise<TrainingSession[]> {
    return apiClient.get<TrainingSession[]>('/training-sessions/my-sessions');
  }

  async createTrainingSession(session: Partial<TrainingSession>): Promise<TrainingSession> {
    return apiClient.post<TrainingSession>('/training-sessions', session);
  }

  async updateTrainingSession(id: string, session: Partial<TrainingSession>): Promise<TrainingSession> {
    return apiClient.put<TrainingSession>(`/training-sessions/${id}`, session);
  }

  async deleteTrainingSession(id: string): Promise<void> {
    return apiClient.delete<void>(`/training-sessions/${id}`);
  }

  async enrollInTraining(sessionId: string): Promise<void> {
    return apiClient.post<void>(`/training-sessions/${sessionId}/enroll`);
  }
}

export const trainingService = new TrainingService();
