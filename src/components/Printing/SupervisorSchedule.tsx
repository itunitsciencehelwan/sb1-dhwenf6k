import React from 'react';
import { Supervisor, AcademicPeriod } from '../../types';
import { PrintableSchedule } from './PrintableSchedule';
import { format } from 'date-fns';

interface SupervisorScheduleProps {
  supervisors: Supervisor[];
  academicPeriod: AcademicPeriod;
}

export const SupervisorSchedule = ({ supervisors, academicPeriod }: SupervisorScheduleProps) => {
  // تجميع كل التوزيعات وترتيبها حسب التاريخ
  const allAssignments = supervisors.flatMap(supervisor =>
    supervisor.assignments.map(assignment => ({
      supervisorName: supervisor.name,
      ...assignment
    }))
  ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <PrintableSchedule
      title="جدول توزيع المشرفين"
      academicPeriod={academicPeriod}
    >
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              التاريخ
            </th>
            <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              الفترة
            </th>
            <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              اسم المشرف
            </th>
            <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              المبنى المخصص
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {allAssignments.map((assignment, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                {format(new Date(assignment.date), 'yyyy/MM/dd')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                {assignment.period === 'morning' ? 'صباحية' : 'مسائية'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                {assignment.supervisorName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                {assignment.building}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </PrintableSchedule>
  );
};