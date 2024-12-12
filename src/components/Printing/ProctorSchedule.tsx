import React from 'react';
import { Proctor, AcademicPeriod } from '../../types';
import { PrintableSchedule } from './PrintableSchedule';
import { format } from 'date-fns';

interface ProctorScheduleProps {
  proctors: Proctor[];
  academicPeriod: AcademicPeriod;
}

export const ProctorSchedule = ({ proctors, academicPeriod }: ProctorScheduleProps) => {
  return (
    <PrintableSchedule
      title="جدول توزيع المراقبين"
      academicPeriod={academicPeriod}
    >
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              اسم المراقب
            </th>
            <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              التاريخ
            </th>
            <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              الفترة
            </th>
            <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              المبنى
            </th>
            <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              القاعة
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {proctors.map((proctor) => (
            proctor.assignedSessions.map((session, index) => (
              <tr key={`${proctor.id}-${index}`}>
                {index === 0 && (
                  <td
                    className="px-6 py-4 whitespace-nowrap text-right"
                    rowSpan={proctor.assignedSessions.length}
                  >
                    {proctor.name}
                  </td>
                )}
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {format(new Date(session.date), 'yyyy/MM/dd')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {session.period === 'morning' ? 'صباحية' : 'مسائية'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {session.building}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {session.room}
                </td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </PrintableSchedule>
  );
};