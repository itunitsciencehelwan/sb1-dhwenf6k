import { Session, SupervisorAssignment } from '../../types';

export interface TimeSlot {
  date: Date;
  period: 'morning' | 'afternoon';
}

export const getTimeSlot = (date: Date, period: 'morning' | 'afternoon'): string => {
  return `${date.toISOString().split('T')[0]}-${period}`;
};

export const hasTimeConflict = (
  existingSlots: TimeSlot[],
  newSlot: TimeSlot
): boolean => {
  return existingSlots.some(slot => 
    slot.date.toISOString().split('T')[0] === newSlot.date.toISOString().split('T')[0] &&
    slot.period === newSlot.period
  );
};

export const getAssignedTimeSlots = (assignments: SupervisorAssignment[]): TimeSlot[] => {
  return assignments.map(assignment => ({
    date: new Date(assignment.date),
    period: assignment.period
  }));
};

export const getSessionTimeSlots = (sessions: Session[]): TimeSlot[] => {
  return sessions.map(session => ({
    date: new Date(session.date),
    period: session.period
  }));
};

export const findAvailableSlot = (
  schedule: { date: Date; period: 'morning' | 'afternoon' }[],
  occupiedSlots: TimeSlot[]
): { date: Date; period: 'morning' | 'afternoon' } | null => {
  return schedule.find(slot => !hasTimeConflict(occupiedSlots, slot)) || null;
};