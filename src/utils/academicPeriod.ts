import { AcademicPeriod } from '../types';

export const createInitialAcademicPeriod = (): AcademicPeriod => {
  const currentYear = new Date().getFullYear();
  return {
    id: crypto.randomUUID(),
    year: `${currentYear}/${currentYear + 1}`,
    semester: 'first',
    isActive: true
  };
};

export const getSemesterName = (semester: string): string => {
  switch (semester) {
    case 'first': return 'الفصل الأول';
    case 'second': return 'الفصل الثاني';
    case 'summer': return 'الفصل الصيفي';
    default: return '';
  }
};

export const getAvailableYears = (): string[] => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 10 }, (_, i) => {
    const year = currentYear - 5 + i;
    return `${year}/${year + 1}`;
  });
};