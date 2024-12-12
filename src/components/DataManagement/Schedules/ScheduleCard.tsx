import React from 'react';

interface ScheduleCardProps {
  isSelected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export const ScheduleCard: React.FC<ScheduleCardProps> = ({
  isSelected,
  onClick,
  children
}) => (
  <div
    onClick={onClick}
    className={`p-4 rounded-lg text-right transition-all cursor-pointer ${
      isSelected
        ? 'bg-indigo-50 border-2 border-indigo-500 shadow-md'
        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent hover:shadow'
    }`}
  >
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-start">
        {children}
      </div>
    </div>
  </div>
);