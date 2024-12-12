import React from 'react';
import { Proctor } from '../../../types';
import { format } from 'date-fns';
import { Calendar, Clock, Building2, DoorOpen } from 'lucide-react';

interface ProctorScheduleProps {
  proctor: Proctor;
}

export const ProctorSchedule: React.FC<ProctorScheduleProps> = ({ proctor }) => {
  const assignedSessions = proctor.assignedSessions || [];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center border-b pb-4">
        <div className="flex items-center gap-2">
          {proctor.requiredSessions && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              المراقبات المطلوبة: {proctor.requiredSessions}
            </span>
          )}
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            المراقبات المسندة: {assignedSessions.length}
          </span>
        </div>
        <h4 className="text-xl font-medium">{proctor.name}</h4>
      </div>

      {assignedSessions.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {assignedSessions.map((session, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-4 space-y-3"
            >
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">
                  {format(new Date(session.date), 'yyyy/MM/dd')}
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="h-4 w-4" />
                <span className="text-sm">
                  {session.period === 'morning' ? 'صباحية' : 'مسائية'}
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600">
                <Building2 className="h-4 w-4" />
                <span className="text-sm">{session.building}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600">
                <DoorOpen className="h-4 w-4" />
                <span className="text-sm">{session.room}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-4">لا يوجد مراقبات مسندة</p>
      )}
    </div>
  );
};