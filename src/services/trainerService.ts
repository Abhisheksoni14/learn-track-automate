
import { apiClient } from './api';
import { TrainerInvitation, TrainerInvitationResponse } from '../types/api';

class TrainerService {
  async inviteTrainer(invitation: TrainerInvitation): Promise<TrainerInvitationResponse> {
    return apiClient.post<TrainerInvitationResponse>('/trainers/invite', invitation);
  }

  async getTrainerInvitations(): Promise<TrainerInvitationResponse[]> {
    return apiClient.get<TrainerInvitationResponse[]>('/trainers/invitations');
  }

  async acceptTrainerInvitation(invitationId: string): Promise<void> {
    return apiClient.post<void>(`/trainers/invitations/${invitationId}/accept`);
  }

  async declineTrainerInvitation(invitationId: string): Promise<void> {
    return apiClient.post<void>(`/trainers/invitations/${invitationId}/decline`);
  }

  async getMyTrainerAssignments(): Promise<any[]> {
    return apiClient.get<any[]>('/trainers/my-assignments');
  }
}

export const trainerService = new TrainerService();
