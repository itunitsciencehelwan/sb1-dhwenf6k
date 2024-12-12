import { CloudStorageService } from './serviceImplementation';
import { SHAREPOINT_CONFIG } from './config';

// Singleton instance
let instance: CloudStorageService | null = null;

export const getCloudStorageService = (): CloudStorageService => {
  if (!instance) {
    instance = new CloudStorageService(SHAREPOINT_CONFIG);
  }
  return instance;
};