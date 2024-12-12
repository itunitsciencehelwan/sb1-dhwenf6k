import React from 'react';
import { Supervisor } from '../../../../types';
import { Calendar, Clock } from 'lucide-react';
import { ScheduleCard } from '../ScheduleCard';

interface SupervisorCardProps {
  supervisor: Supervisor;
  isSelected: boolean;
  assignmentCount: number;
  onClick: () => void;
}

export const SupervisorCard: React.FC<SupervisorCardProps> = ({
  supervisor,
  isSelected,
  assignmentCount,
  onClick
}) => (
  <ScheduleCard
    isSelected={isSelected}
    onClick={onClick}
  >
    <div className="flex-1">
      <p className="font-medium text-lg">{supervisor.name}</p>
      <div className="flex items-center gap-2 text-gray-600 mt-2">
        <Calendar className="h-4 w-4" />
        <p className="text-sm">عدد المهام: {assignmentCount}</p>
      </div>
      {supervisor.preferredPeriod && (
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="h-4 w-4" />
          <p className="text-sm">
            الفترة المفضلة: {supervisor.preferredPeriod === 'morning' ? 'صباحية' : 'مسائية'}
          </p>
        </div>
      )}
    </div>
  </ScheduleCard>
);