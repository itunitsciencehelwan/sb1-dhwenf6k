import { format } from 'date-fns';
import { MESSAGES } from '../constants/messages';

export const formatSemester = (semester: string): string => {
  switch (semester) {
    case 'first': return MESSAGES.SEMESTERS.FIRST;
    case 'second': return MESSAGES.SEMESTERS.SECOND;
    case 'summer': return MESSAGES.SEMESTERS.SUMMER;
    default: return '';
  }
};

export const formatPeriod = (period: 'morning' | 'afternoon'): string => {
  return period === 'morning' ? MESSAGES.PERIODS.MORNING : MESSAGES.PERIODS.AFTERNOON;
};

export const formatDate = (date: Date): string => {
  return format(new Date(date), 'yyyy/MM/dd');
};