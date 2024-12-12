import React from 'react';
import { Supervisor } from '../../../types';
import { Trash2, Edit } from 'lucide-react';

interface SupervisorsSectionProps {
  supervisors: Supervisor[];
  onEdit: (supervisor: Supervisor) => void;
  onDelete: (id: string) => void;
}

export const SupervisorsSection: React.FC<SupervisorsSectionProps> = ({
  supervisors,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 text-right">المشرفون</h3>
      </div>
      <div className="border-t border-gray-200">
        <div className="divide-y divide-gray-200">
          {supervisors.map((supervisor) => (
            <div key={supervisor.id} className="px-4 py-4 flex justify-between items-center">
              <div className="flex space-x-2 rtl:space-x-reverse">
                <button
                  onClick={() => onEdit(supervisor)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onDelete(supervisor.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
              <div className="text-right">
                <p className="font-medium">{supervisor.name}</p>
                <p className="text-sm text-gray-600">
                  الفترة المفضلة: {
                    supervisor.preferredPeriod === 'morning' ? 'صباحية' :
                    supervisor.preferredPeriod === 'afternoon' ? 'مسائية' :
                    'بدون تفضيل'
                  }
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};