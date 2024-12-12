import React from 'react';
import { Proctor } from '../../../../types';
import { Calendar, Building2 } from 'lucide-react';
import { ScheduleCard } from '../ScheduleCard';

interface ProctorCardProps {
  proctor: Proctor;
  isSelected: boolean;
  assignmentCount: number;
  onClick: () => void;
}

export const ProctorCard: React.FC<ProctorCardProps> = ({
  proctor,
  isSelected,
  assignmentCount,
  onClick
}) => (
  <ScheduleCard
    isSelected={isSelected}
    onClick={onClick}
  >
    <div className="flex-1">
      <p className="font-medium text-lg">{proctor.name}</p>
      <div className="flex items-center gap-2 text-gray-600 mt-2">
        <Calendar className="h-4 w-4" />
        <p className="text-sm">عدد المراقبات: {assignmentCount}</p>
      </div>
      {proctor.requiredSessions && (
        <div className="flex items-center gap-2 text-gray-600">
          <Building2 className="h-4 w-4" />
          <p className="text-sm">المراقبات المطلوبة: {proctor.requiredSessions}</p>
        </div>
      )}
    </div>
  </ScheduleCard>
);