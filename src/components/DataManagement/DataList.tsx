import React, { useState } from 'react';
import { Building, Supervisor, Proctor, Session, AcademicPeriod } from '../../types';
import { EditModal } from './EditModal';
import { ScheduleDisplay } from './ScheduleDisplay';
import { BuildingsSection } from './Sections/BuildingsSection';
import { SupervisorsSection } from './Sections/SupervisorsSection';
import { ProctorsSection } from './Sections/ProctorsSection';
import { SessionsSection } from './Sections/SessionsSection';

interface DataListProps {
  data: {
    buildings: Building[];
    supervisors: Supervisor[];
    proctors: Proctor[];
    sessions: Session[];
    academicPeriod: AcademicPeriod;
  };
  onDelete: (type: string, id: string) => void;
  onEdit: (type: string, item: any) => void;
}

export const DataList = ({ data, onDelete, onEdit }: DataListProps) => {
  const [editModal, setEditModal] = useState<{
    show: boolean;
    type: 'building' | 'supervisor' | 'proctor' | 'session';
    item: any;
  } | null>(null);

  const [activeTab, setActiveTab] = useState<'data' | 'schedules'>('data');

  const handleEdit = (type: 'building' | 'supervisor' | 'proctor' | 'session', item: any) => {
    setEditModal({ show: true, type, item });
  };

  const handleSave = (type: string, item: any) => {
    onEdit(type, item);
    setEditModal(null);
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex">
          <button
            onClick={() => setActiveTab('data')}
            className={`${
              activeTab === 'data'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ml-8`}
          >
            البيانات الأساسية
          </button>
          <button
            onClick={() => setActiveTab('schedules')}
            className={`${
              activeTab === 'schedules'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            الجداول الفردية
          </button>
        </nav>
      </div>

      {activeTab === 'data' ? (
        <div className="space-y-8">
          <BuildingsSection
            buildings={data.buildings}
            onEdit={(building) => handleEdit('building', building)}
            onDelete={(id) => onDelete('building', id)}
          />
          
          <SupervisorsSection
            supervisors={data.supervisors}
            onEdit={(supervisor) => handleEdit('supervisor', supervisor)}
            onDelete={(id) => onDelete('supervisor', id)}
          />
          
          <ProctorsSection
            proctors={data.proctors}
            onEdit={(proctor) => handleEdit('proctor', proctor)}
            onDelete={(id) => onDelete('proctor', id)}
          />
          
          <SessionsSection
            sessions={data.sessions}
            onEdit={(session) => handleEdit('session', session)}
            onDelete={(id) => onDelete('session', id)}
          />
        </div>
      ) : (
        <ScheduleDisplay
          supervisors={data.supervisors}
          proctors={data.proctors}
          academicPeriod={data.academicPeriod}
        />
      )}

      {/* Edit Modal */}
      {editModal && (
        <EditModal
          type={editModal.type}
          item={editModal.item}
          buildings={data.buildings}
          onSave={handleSave}
          onClose={() => setEditModal(null)}
        />
      )}
    </div>
  );
};