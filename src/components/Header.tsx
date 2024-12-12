import React from 'react';
import { AcademicPeriod } from '../types';

interface HeaderProps {
  academicPeriod: AcademicPeriod;
  onPeriodChange: (period: AcademicPeriod) => void;
}

export const Header = ({ academicPeriod, onPeriodChange }: HeaderProps) => {
  const years = Array.from({ length: 10 }, (_, i) => {
    const year = new Date().getFullYear() - 5 + i;
    return `${year}/${year + 1}`;
  });

  const handleYearChange = (year: string) => {
    onPeriodChange({
      ...academicPeriod,
      year
    });
  };

  const handleSemesterChange = (semester: 'first' | 'second' | 'summer') => {
    onPeriodChange({
      ...academicPeriod,
      semester
    });
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-900 text-right">
            نظام توزيع الإشراف على الامتحانات
          </h1>
          
          <div className="flex gap-4 justify-end">
            <div className="flex items-center gap-2">
              <select
                value={academicPeriod.semester}
                onChange={(e) => handleSemesterChange(e.target.value as 'first' | 'second' | 'summer')}
                className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
              >
                <option value="first">الفصل الأول</option>
                <option value="second">الفصل الثاني</option>
                <option value="summer">الفصل الصيفي</option>
              </select>
              <label className="text-sm font-medium text-gray-700">الفصل الدراسي:</label>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={academicPeriod.year}
                onChange={(e) => handleYearChange(e.target.value)}
                className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
              >
                {years.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <label className="text-sm font-medium text-gray-700">العام الدراسي:</label>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};