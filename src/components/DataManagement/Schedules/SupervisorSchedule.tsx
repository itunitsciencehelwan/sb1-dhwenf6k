import React from 'react';
import { Supervisor } from '../../../types';
import { format } from 'date-fns';
import { Calendar, Clock, Building2 } from 'lucide-react';

interface SupervisorScheduleProps {
  supervisor: Supervisor;
}

export const SupervisorSchedule: React.FC<SupervisorScheduleProps> = ({ supervisor }) => {
  const assignments = supervisor.assignments || [];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center border-b pb-4">
        <div className="flex items-center gap-2">
          {supervisor.preferredPeriod && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              الفترة المفضلة: {supervisor.preferredPeriod === 'morning' ? 'صباحية' : 'مسائية'}
            </span>
          )}
        </div>
        <h4 className="text-xl font-medium">{supervisor.name}</h4>
      </div>

      {assignments.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {assignments.map((assignment, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-4 space-y-3"
            >
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">
                  {format(new Date(assignment.date), 'yyyy/MM/dd')}
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="h-4 w-4" />
                <span className="text-sm">
                  {assignment.period === 'morning' ? 'صباحية' : 'مسائية'}
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600">
                <Building2 className="h-4 w-4" />
                <span className="text-sm">{assignment.building}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-4">لا يوجد مهام مسندة</p>
      )}
    </div>
  );
};