
// User and Authentication Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'employee' | 'ld' | 'admin';
  department: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  refreshToken: string;
  expiresAt: string;
}

export interface LoginRequest {
  email: string;
  password?: string;
  loginKey?: string; // For external trainers
}

// Training Request Types
export interface TrainingRequest {
  id: string;
  title: string;
  description: string;
  businessJustification: string;
  department: string;
  trainingType: 'technical' | 'non-technical' | 'leadership' | 'compliance';
  priority: 'low' | 'medium' | 'high' | 'critical';
  expectedParticipants: number;
  duration: number;
  preferredDate?: string;
  budget?: number;
  status: 'pending' | 'tech_approved' | 'finance_review' | 'approved' | 'rejected';
  requesterId: string;
  requesterName: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTrainingRequest {
  title: string;
  description: string;
  businessJustification: string;
  department: string;
  trainingType: 'technical' | 'non-technical' | 'leadership' | 'compliance';
  priority: 'low' | 'medium' | 'high' | 'critical';
  expectedParticipants: number;
  duration: number;
  preferredDate?: string;
  budget?: number;
}

// Training Session Types
export interface TrainingSession {
  id: string;
  requestId: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  duration: number;
  location: string;
  maxParticipants: number;
  registeredParticipants: number;
  trainerId?: string;
  trainerName?: string;
  trainerEmail?: string;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  createdAt: string;
}

// Trainer Invitation Types
export interface TrainerInvitation {
  email: string;
  trainingSessionId: string;
  message?: string;
  isInternal: boolean;
}

export interface TrainerInvitationResponse {
  id: string;
  email: string;
  loginKey?: string;
  status: 'sent' | 'accepted' | 'declined';
  sentAt: string;
}

// Report Types
export interface ReportFilters {
  startDate: string;
  endDate: string;
  department?: string;
  trainingType?: string;
  status?: string;
}

export interface TrainingReport {
  totalRequests: number;
  approvedRequests: number;
  rejectedRequests: number;
  pendingRequests: number;
  departmentBreakdown: { [key: string]: number };
  typeBreakdown: { [key: string]: number };
  monthlyTrends: { month: string; count: number }[];
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  success: false;
  message: string;
  errors?: { [key: string]: string[] };
}
