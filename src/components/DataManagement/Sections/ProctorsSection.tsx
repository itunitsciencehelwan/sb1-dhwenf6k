import React from 'react';
import { Proctor } from '../../../types';
import { Trash2, Edit } from 'lucide-react';

interface ProctorsSectionProps {
  proctors: Proctor[];
  onEdit: (proctor: Proctor) => void;
  onDelete: (id: string) => void;
}

export const ProctorsSection: React.FC<ProctorsSectionProps> = ({
  proctors,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 text-right">المراقبون</h3>
      </div>
      <div className="border-t border-gray-200">
        <div className="divide-y divide-gray-200">
          {proctors.map((proctor) => (
            <div key={proctor.id} className="px-4 py-4 flex justify-between items-center">
              <div className="flex space-x-2 rtl:space-x-reverse">
                <button
                  onClick={() => onEdit(proctor)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onDelete(proctor.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
              <div className="text-right">
                <p className="font-medium">{proctor.name}</p>
                {proctor.requiredSessions && (
                  <p className="text-sm text-gray-600">
                    عدد المراقبات المطلوبة: {proctor.requiredSessions}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};