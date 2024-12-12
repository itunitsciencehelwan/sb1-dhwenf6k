import { AcademicPeriod } from '../../../types';
import { PDFHeaderConfig } from '../types';
import { formatSemester, formatDate } from './formatters';
import { MESSAGES } from '../constants/messages';

export const createHeaderConfig = (title: string, academicPeriod: AcademicPeriod): PDFHeaderConfig => {
  return {
    title,
    academicYear: `${MESSAGES.HEADER.ACADEMIC_YEAR}: ${academicPeriod.year}`,
    semester: `${MESSAGES.HEADER.SEMESTER}: ${formatSemester(academicPeriod.semester)}`,
    date: `${MESSAGES.HEADER.ISSUE_DATE}: ${formatDate(new Date())}`
  };
};