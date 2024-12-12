import { format } from 'date-fns';
import { Supervisor, Proctor, AcademicPeriod } from '../../types';
import { PDFHeaderConfig } from './types';

export const formatSemester = (semester: string): string => {
  switch (semester) {
    case 'first': return 'الفصل الأول';
    case 'second': return 'الفصل الثاني';
    case 'summer': return 'الفصل الصيفي';
    default: return '';
  }
};

export const formatPeriod = (period: 'morning' | 'afternoon'): string => {
  return period === 'morning' ? 'صباحية' : 'مسائية';
};

export const formatDate = (date: Date): string => {
  return format(new Date(date), 'yyyy/MM/dd');
};

export const createHeaderConfig = (title: string, academicPeriod: AcademicPeriod): PDFHeaderConfig => {
  return {
    title,
    academicYear: academicPeriod.year,
    semester: formatSemester(academicPeriod.semester),
    date: formatDate(new Date())
  };
};

export const formatSupervisorData = (supervisor: Supervisor): string[][] => {
  return supervisor.assignments.map(assignment => [
    assignment.building,
    formatPeriod(assignment.period),
    formatDate(new Date(assignment.date))
  ]);
};

export const formatProctorData = (proctor: Proctor): string[][] => {
  return proctor.assignedSessions.map(session => [
    session.room,
    session.building,
    formatPeriod(session.period),
    formatDate(new Date(session.date))
  ]);
};