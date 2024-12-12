import { useState, useEffect } from 'react';
import { CloudStorageService } from '../utils/cloudStorage';
import { DataState } from '../types';

export const useCloudStorage = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cloudStorage = CloudStorageService.getInstance();

  useEffect(() => {
    const initializeStorage = async () => {
      const result = await cloudStorage.initialize();
      setIsInitialized(result.success);
      if (!result.success) {
        setError(result.message);
      }
    };

    initializeStorage();
  }, []);

  const saveToCloud = async (data: DataState): Promise<boolean> => {
    if (!isInitialized) {
      setError('لم يتم الاتصال بالتخزين السحابي');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await cloudStorage.saveData(data);
      if (!result.success) {
        setError(result.message);
      }
      return result.success;
    } catch (err) {
      setError('حدث خطأ أثناء حفظ البيانات');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const loadFromCloud = async (academicPeriod: { year: string; semester: string }): Promise<DataState | null> => {
    if (!isInitialized) {
      setError('لم يتم الاتصال بالتخزين السحابي');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await cloudStorage.loadData(academicPeriod);
      if (!result.success) {
        setError(result.message);
        return null;
      }
      return result.data;
    } catch (err) {
      setError('حدث خطأ أثناء تحميل البيانات');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isInitialized,
    isLoading,
    error,
    saveToCloud,
    loadFromCloud
  };
};