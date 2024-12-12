import React from 'react';
import { Session } from '../../../types';
import { Trash2, Edit } from 'lucide-react';
import { format } from 'date-fns';

interface SessionsSectionProps {
  sessions: Session[];
  onEdit: (session: Session) => void;
  onDelete: (id: string) => void;
}

export const SessionsSection: React.FC<SessionsSectionProps> = ({
  sessions,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 text-right">الجلسات</h3>
      </div>
      <div className="border-t border-gray-200">
        <div className="divide-y divide-gray-200">
          {sessions.map((session) => (
            <div key={session.id} className="px-4 py-4 flex justify-between items-center">
              <div className="flex space-x-2 rtl:space-x-reverse">
                <button
                  onClick={() => onEdit(session)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onDelete(session.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  {format(new Date(session.date), 'yyyy/MM/dd')} - 
                  {session.period === 'morning' ? ' صباحية' : ' مسائية'}
                </p>
                <p className="text-sm text-gray-600">
                  {session.building} - {session.room}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};