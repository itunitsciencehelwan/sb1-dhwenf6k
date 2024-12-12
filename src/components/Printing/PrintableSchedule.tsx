import React from 'react';
import { format } from 'date-fns';
import { AcademicPeriod } from '../../types';

interface PrintableScheduleProps {
  title: string;
  academicPeriod: AcademicPeriod;
  children: React.ReactNode;
}

export const PrintableSchedule: React.FC<PrintableScheduleProps> = ({
  title,
  academicPeriod,
  children
}) => {
  const getSemesterName = (semester: string) => {
    switch (semester) {
      case 'first': return 'الفصل الأول';
      case 'second': return 'الفصل الثاني';
      case 'summer': return 'الفصل الصيفي';
      default: return '';
    }
  };

  return (
    <div className="print-container">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <div className="text-sm text-gray-600">
          <p>العام الدراسي: {academicPeriod.year}</p>
          <p>الفصل الدراسي: {getSemesterName(academicPeriod.semester)}</p>
          <p>تاريخ الطباعة: {format(new Date(), 'yyyy/MM/dd')}</p>
        </div>
      </div>
      {children}
    </div>
  );
};