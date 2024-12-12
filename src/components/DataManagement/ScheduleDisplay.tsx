import React, { useState } from 'react';
import { Supervisor, Proctor, AcademicPeriod } from '../../types';
import { ScheduleSection } from './Schedules/ScheduleSection';
import { SupervisorSchedule } from './Schedules/SupervisorSchedule';
import { ProctorSchedule } from './Schedules/ProctorSchedule';
import { IndividualScheduleView } from './Schedules/IndividualScheduleView';
import { ViewTypeSelector } from './Schedules/ViewTypeSelector';

interface ScheduleDisplayProps {
  supervisors: Supervisor[];
  proctors: Proctor[];
  academicPeriod: AcademicPeriod;
}

export const ScheduleDisplay: React.FC<ScheduleDisplayProps> = ({ 
  supervisors, 
  proctors, 
  academicPeriod 
}) => {
  const [viewType, setViewType] = useState<'all' | 'individual'>('all');

  return (
    <div className="space-y-8">
      <ViewTypeSelector viewType={viewType} onViewTypeChange={setViewType} />

      {viewType === 'all' ? (
        <>
          <ScheduleSection
            id="supervisors-schedule"
            title="جداول المشرفين"
          >
            {supervisors.map((supervisor) => (
              <SupervisorSchedule 
                key={supervisor.id} 
                supervisor={supervisor} 
              />
            ))}
          </ScheduleSection>

          <ScheduleSection
            id="proctors-schedule"
            title="جداول المراقبين"
          >
            {proctors.map((proctor) => (
              <ProctorSchedule 
                key={proctor.id} 
                proctor={proctor} 
              />
            ))}
          </ScheduleSection>
        </>
      ) : (
        <IndividualScheduleView
          supervisors={supervisors}
          proctors={proctors}
          academicPeriod={academicPeriod}
        />
      )}
    </div>
  );
};