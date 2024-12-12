import { Building, Supervisor, Proctor, Session, AcademicPeriod, DataState } from '../types';

const STORAGE_KEY_PREFIX = 'exam-supervision-data';

export const getStorageKey = (academicPeriod: AcademicPeriod) => {
  return `${STORAGE_KEY_PREFIX}-${academicPeriod.year}-${academicPeriod.semester}`;
};

export const saveToStorage = (data: DataState) => {
  try {
    // Save current period data
    const currentPeriodKey = getStorageKey(data.academicPeriod);
    localStorage.setItem(currentPeriodKey, JSON.stringify(data));

    // Save active period info
    localStorage.setItem('exam-supervision-active-period', JSON.stringify(data.academicPeriod));
    return true;
  } catch (error) {
    console.error('Error saving data:', error);
    return false;
  }
};

export const loadFromStorage = (academicPeriod?: AcademicPeriod): DataState | null => {
  try {
    // If no specific period provided, try to load active period
    if (!academicPeriod) {
      const activePeriodData = localStorage.getItem('exam-supervision-active-period');
      if (activePeriodData) {
        academicPeriod = JSON.parse(activePeriodData);
      } else {
        // Create default period if none exists
        const currentYear = new Date().getFullYear();
        academicPeriod = {
          id: crypto.randomUUID(),
          year: `${currentYear}/${currentYear + 1}`,
          semester: 'first',
          isActive: true
        };
      }
    }

    const storageKey = getStorageKey(academicPeriod);
    const data = localStorage.getItem(storageKey);
    
    if (data) {
      const parsedData = JSON.parse(data);
      // Convert date strings back to Date objects
      parsedData.sessions = parsedData.sessions.map((session: any) => ({
        ...session,
        date: new Date(session.date)
      }));
      return parsedData;
    }

    // Return empty data structure with the academic period
    return {
      buildings: [],
      supervisors: [],
      proctors: [],
      sessions: [],
      academicPeriod
    };
  } catch (error) {
    console.error('Error loading data:', error);
    return null;
  }
};