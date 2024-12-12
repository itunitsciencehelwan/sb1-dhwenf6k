import React from 'react';

interface ScheduleSectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({
  id,
  title,
  children
}) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
      </div>
      <div className="border-t border-gray-200" id={id}>
        <div className="divide-y divide-gray-200">
          {children}
        </div>
      </div>
    </div>
  );
};