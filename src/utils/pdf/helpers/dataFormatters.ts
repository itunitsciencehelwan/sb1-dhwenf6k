import { Supervisor, Proctor } from '../../../types';
import { formatDate, formatPeriod } from './formatters';

export const formatSupervisorData = (supervisor: Supervisor): string[][] => {
  return supervisor.assignments.map(assignment => [
    assignment.building,
    formatPeriod(assignment.period),
    formatDate(new Date(assignment.date))
  ]);
};

export const formatProctorData = (proctor: Proctor): string[][] => {
  return proctor.assignedSessions.map(session => [
    session.room,
    session.building,
    formatPeriod(session.period),
    formatDate(new Date(session.date))
  ]);
};