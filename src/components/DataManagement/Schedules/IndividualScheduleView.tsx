import React, { useState } from 'react';
import { Supervisor, Proctor, AcademicPeriod } from '../../../types';
import { SupervisorSchedule } from './SupervisorSchedule';
import { ProctorSchedule } from './ProctorSchedule';
import { SupervisorCard } from './Cards/SupervisorCard';
import { ProctorCard } from './Cards/ProctorCard';
import { Search } from 'lucide-react';
import { useScheduleData } from '../../../hooks/useScheduleData';

interface IndividualScheduleViewProps {
  supervisors: Supervisor[];
  proctors: Proctor[];
  academicPeriod: AcademicPeriod;
}

export const IndividualScheduleView: React.FC<IndividualScheduleViewProps> = ({
  supervisors,
  proctors,
  academicPeriod
}) => {
  const [selectedType, setSelectedType] = useState<'supervisor' | 'proctor'>('supervisor');
  const [selectedId, setSelectedId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  const { processedSupervisors, processedProctors, getAssignmentCount } = useScheduleData(supervisors, proctors);

  const filteredSupervisors = processedSupervisors.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProctors = processedProctors.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedSupervisor = processedSupervisors.find(s => s.id === selectedId);
  const selectedProctor = processedProctors.find(p => p.id === selectedId);

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="p-6 space-y-6">
        {/* Type Selection */}
        <div className="flex justify-end">
          <div className="flex space-x-4 rtl:space-x-reverse">
            <button
              onClick={() => {
                setSelectedType('proctor');
                setSelectedId('');
              }}
              className={`px-4 py-2 rounded-md ${
                selectedType === 'proctor'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              المراقبين
            </button>
            <button
              onClick={() => {
                setSelectedType('supervisor');
                setSelectedId('');
              }}
              className={`px-4 py-2 rounded-md ${
                selectedType === 'supervisor'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              المشرفين
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="بحث..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pr-10 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-right"
          />
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {selectedType === 'supervisor'
            ? filteredSupervisors.map((supervisor) => (
                <SupervisorCard
                  key={supervisor.id}
                  supervisor={supervisor}
                  isSelected={selectedId === supervisor.id}
                  assignmentCount={getAssignmentCount('supervisor', supervisor.id)}
                  onClick={() => setSelectedId(supervisor.id)}
                />
              ))
            : filteredProctors.map((proctor) => (
                <ProctorCard
                  key={proctor.id}
                  proctor={proctor}
                  isSelected={selectedId === proctor.id}
                  assignmentCount={getAssignmentCount('proctor', proctor.id)}
                  onClick={() => setSelectedId(proctor.id)}
                />
              ))}
        </div>

        {/* Selected Schedule Display */}
        {selectedId && (
          <div className="mt-8 border-t pt-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              {selectedType === 'supervisor' && selectedSupervisor ? (
                <SupervisorSchedule supervisor={selectedSupervisor} />
              ) : selectedType === 'proctor' && selectedProctor ? (
                <ProctorSchedule proctor={selectedProctor} />
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};