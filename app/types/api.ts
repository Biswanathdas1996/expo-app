// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  method?: string;
  endpoint?: string;
  payload?: any;
  responseTime?: number;
  timestamp?: string;
  data?: T;
}

// Auth Types
export interface User {
  userId: string;
  userName: string;
  fullName: string;
  mobileNumber: string;
  isNewUser?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface TestResult {
  authToken: string;
  sessionId: string;
  isNewUser: boolean;
  userId: string;
  userName: string;
}

export interface AuthResponse extends ApiResponse {
  testResult?: TestResult;
  user?: User;
  token?: string;
}

export interface RegisterRequest {
  fullName: string;
  mobileNumber: string;
}

export interface LoginRequest {
  fullName: string;
  mobileNumber: string;
}

// Storage Types
export interface UserSession {
  user: User;
  authToken: string;
  sessionId: string;
  userId: string;
  userName: string;
  isNewUser: boolean;
  expiresAt: number;
  createdAt: number;
}
