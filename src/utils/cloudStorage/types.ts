import { DataState } from '../../types';

export interface CloudStorageResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface CloudStorageConfig {
  baseUrl: string;
  credentials: RequestCredentials;
}

export interface CloudStorageState {
  isInitialized: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AcademicPeriodIdentifier {
  year: string;
  semester: string;
}

export interface CloudStorageOperations {
  initialize(): Promise<CloudStorageResponse>;
  saveData(data: DataState): Promise<CloudStorageResponse>;
  loadData(period: AcademicPeriodIdentifier): Promise<CloudStorageResponse>;
}