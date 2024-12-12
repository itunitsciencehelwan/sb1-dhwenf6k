import React from 'react';
import { Building } from '../../types';
import { BuildingForm } from './BuildingForm';
import { SupervisorForm } from './SupervisorForm';
import { ProctorForm } from './ProctorForm';
import { SessionForm } from './SessionForm';

interface ManualEntrySectionProps {
  buildings: Building[];
  onAddItem: (type: string, item: any) => void;
}

export const ManualEntrySection = ({ buildings, onAddItem }: ManualEntrySectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">إضافة مبنى</h2>
          <BuildingForm onSubmit={(building) => onAddItem('building', building)} />
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">إضافة مشرف</h2>
          <SupervisorForm onSubmit={(supervisor) => onAddItem('supervisor', supervisor)} />
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">إضافة مراقب</h2>
          <ProctorForm onSubmit={(proctor) => onAddItem('proctor', proctor)} />
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">إضافة جلسة</h2>
          <SessionForm
            buildings={buildings}
            onSubmit={(session) => onAddItem('session', session)}
          />
        </div>
      </div>
    </div>
  );
};