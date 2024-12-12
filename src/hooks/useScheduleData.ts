import { useMemo } from 'react';
import { Supervisor, Proctor } from '../types';

export const useScheduleData = (supervisors: Supervisor[], proctors: Proctor[]) => {
  const processedSupervisors = useMemo(() => 
    supervisors.map(supervisor => ({
      ...supervisor,
      assignments: supervisor.assignments || []
    })), [supervisors]
  );

  const processedProctors = useMemo(() => 
    proctors.map(proctor => ({
      ...proctor,
      assignedSessions: proctor.assignedSessions || []
    })), [proctors]
  );

  const getAssignmentCount = (type: 'supervisor' | 'proctor', id: string): number => {
    if (type === 'supervisor') {
      const supervisor = processedSupervisors.find(s => s.id === id);
      return supervisor?.assignments.length || 0;
    } else {
      const proctor = processedProctors.find(p => p.id === id);
      return proctor?.assignedSessions.length || 0;
    }
  };

  return {
    processedSupervisors,
    processedProctors,
    getAssignmentCount
  };
};