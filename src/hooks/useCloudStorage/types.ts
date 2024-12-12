import { DataState } from '../../types';
import { CloudStorageState, AcademicPeriodIdentifier } from '../../utils/cloudStorage/types';

export interface UseCloudStorageReturn extends CloudStorageState {
  saveToCloud: (data: DataState) => Promise<boolean>;
  loadFromCloud: (period: AcademicPeriodIdentifier) => Promise<DataState | null>;
}