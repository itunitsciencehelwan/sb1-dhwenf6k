import { 
  CloudStorageConfig, 
  CloudStorageResponse, 
  CloudStorageOperations,
  AcademicPeriodIdentifier
} from './types';
import { MESSAGES } from './messages';
import { getFilename } from './config';
import { DataState } from '../../types';

export class CloudStorageService implements CloudStorageOperations {
  private isAuthenticated: boolean = false;
  
  constructor(private config: CloudStorageConfig) {}

  async initialize(): Promise<CloudStorageResponse> {
    try {
      const response = await fetch(`${this.config.baseUrl}?e=qRBtYm`, {
        method: 'HEAD',
        credentials: this.config.credentials
      });

      this.isAuthenticated = response.ok;
      
      return {
        success: this.isAuthenticated,
        message: this.isAuthenticated ? MESSAGES.INIT.SUCCESS : MESSAGES.INIT.FAILURE
      };
    } catch (error) {
      console.error('Cloud storage initialization error:', error);
      return {
        success: false,
        message: MESSAGES.INIT.ERROR
      };
    }
  }

  async saveData(data: DataState): Promise<CloudStorageResponse> {
    if (!this.isAuthenticated) {
      return {
        success: false,
        message: MESSAGES.SAVE.NOT_INITIALIZED
      };
    }

    try {
      const filename = getFilename(data.academicPeriod.year, data.academicPeriod.semester);
      const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
      const formData = new FormData();
      formData.append('file', blob, filename);

      const response = await fetch(`${this.config.baseUrl}/upload`, {
        method: 'POST',
        credentials: this.config.credentials,
        body: formData
      });

      return {
        success: response.ok,
        message: response.ok ? MESSAGES.SAVE.SUCCESS : MESSAGES.SAVE.FAILURE
      };
    } catch (error) {
      console.error('Cloud storage save error:', error);
      return {
        success: false,
        message: MESSAGES.SAVE.ERROR
      };
    }
  }

  async loadData(period: AcademicPeriodIdentifier): Promise<CloudStorageResponse> {
    if (!this.isAuthenticated) {
      return {
        success: false,
        message: MESSAGES.LOAD.NOT_INITIALIZED
      };
    }

    try {
      const filename = getFilename(period.year, period.semester);
      const response = await fetch(`${this.config.baseUrl}/download/${filename}`, {
        credentials: this.config.credentials
      });

      if (!response.ok) {
        return {
          success: false,
          message: MESSAGES.LOAD.NOT_FOUND
        };
      }

      const data = await response.json();
      return {
        success: true,
        message: MESSAGES.LOAD.SUCCESS,
        data
      };
    } catch (error) {
      console.error('Cloud storage load error:', error);
      return {
        success: false,
        message: MESSAGES.LOAD.ERROR
      };
    }
  }
}