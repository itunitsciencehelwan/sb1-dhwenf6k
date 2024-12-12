import { Supervisor, Proctor } from '../../types';

const DISTRIBUTION_STORAGE_KEY = 'exam-supervision-distribution';

interface StoredDistribution {
  supervisors: Supervisor[];
  proctors: Proctor[];
  timestamp: number;
}

export const saveDistribution = (distribution: {
  supervisors: Supervisor[];
  proctors: Proctor[];
}) => {
  try {
    const dataToStore: StoredDistribution = {
      ...distribution,
      timestamp: Date.now()
    };
    localStorage.setItem(DISTRIBUTION_STORAGE_KEY, JSON.stringify(dataToStore));
    return true;
  } catch (error) {
    console.error('Error saving distribution:', error);
    return false;
  }
};

export const loadDistribution = (): {
  supervisors: Supervisor[];
  proctors: Proctor[];
} | null => {
  try {
    const storedData = localStorage.getItem(DISTRIBUTION_STORAGE_KEY);
    if (storedData) {
      const parsedData: StoredDistribution = JSON.parse(storedData);
      return {
        supervisors: parsedData.supervisors,
        proctors: parsedData.proctors
      };
    }
    return null;
  } catch (error) {
    console.error('Error loading distribution:', error);
    return null;
  }
};

export const getDistributionTimestamp = (): Date | null => {
  try {
    const storedData = localStorage.getItem(DISTRIBUTION_STORAGE_KEY);
    if (storedData) {
      const parsedData: StoredDistribution = JSON.parse(storedData);
      return new Date(parsedData.timestamp);
    }
    return null;
  } catch {
    return null;
  }
};