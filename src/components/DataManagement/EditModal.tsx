import React from 'react';
import { Building, Supervisor, Proctor, Session } from '../../types';
import { BuildingForm } from '../ManualEntry/BuildingForm';
import { SupervisorForm } from '../ManualEntry/SupervisorForm';
import { ProctorForm } from '../ManualEntry/ProctorForm';
import { SessionForm } from '../ManualEntry/SessionForm';
import { X } from 'lucide-react';

interface EditModalProps {
  type: 'building' | 'supervisor' | 'proctor' | 'session';
  item: Building | Supervisor | Proctor | Session;
  buildings?: Building[];
  onSave: (type: string, item: any) => void;
  onClose: () => void;
}

export const EditModal = ({ type, item, buildings, onSave, onClose }: EditModalProps) => {
  const handleSubmit = (updatedItem: any) => {
    onSave(type, { ...updatedItem, id: item.id });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute left-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>
        
        <h2 className="text-xl font-bold mb-4 text-right">
          {type === 'building' && 'تعديل بيانات المبنى'}
          {type === 'supervisor' && 'تعديل بيانات المشرف'}
          {type === 'proctor' && 'تعديل بيانات المراقب'}
          {type === 'session' && 'تعديل بيانات الجلسة'}
        </h2>

        {type === 'building' && (
          <BuildingForm
            onSubmit={handleSubmit}
            initialData={item as Building}
          />
        )}
        {type === 'supervisor' && (
          <SupervisorForm
            onSubmit={handleSubmit}
            initialData={item as Supervisor}
          />
        )}
        {type === 'proctor' && (
          <ProctorForm
            onSubmit={handleSubmit}
            initialData={item as Proctor}
          />
        )}
        {type === 'session' && buildings && (
          <SessionForm
            buildings={buildings}
            onSubmit={handleSubmit}
            initialData={item as Session}
          />
        )}
      </div>
    </div>
  );
};