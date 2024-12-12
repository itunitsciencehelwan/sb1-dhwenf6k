import { Session, Supervisor, Proctor, SupervisorAssignment } from '../../types';
import { DailySchedule } from './types';
import { TimeSlot, hasTimeConflict, getAssignedTimeSlots, getSessionTimeSlots, findAvailableSlot } from './timeConflicts';

export const createDailySchedules = (sessions: Session[]): Map<string, DailySchedule> => {
  const dailySchedules = new Map<string, DailySchedule>();

  sessions.forEach(session => {
    const dateStr = session.date.toISOString().split('T')[0];
    if (!dailySchedules.has(dateStr)) {
      dailySchedules.set(dateStr, {
        date: new Date(session.date),
        morning: [],
        afternoon: []
      });
    }
    
    const schedule = dailySchedules.get(dateStr)!;
    const periodSchedule = session.period === 'morning' ? schedule.morning : schedule.afternoon;
    
    if (!periodSchedule.some(s => s.building === session.building)) {
      periodSchedule.push({ building: session.building });
    }
  });

  return dailySchedules;
};

export const assignSupervisors = (
  supervisors: Supervisor[],
  dailySchedules: Map<string, DailySchedule>
): Supervisor[] => {
  const sortedSchedules = Array.from(dailySchedules.values())
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return supervisors.map(supervisor => {
    const assignments: SupervisorAssignment[] = [];
    const preferredPeriod = supervisor.preferredPeriod || 
      (Math.random() > 0.5 ? 'morning' : 'afternoon');

    sortedSchedules.forEach(schedule => {
      // Get current assigned time slots for this supervisor
      const occupiedSlots = getAssignedTimeSlots(assignments);

      // Check if supervisor is already assigned at this time
      const currentSlot = {
        date: schedule.date,
        period: preferredPeriod
      };

      if (!hasTimeConflict(occupiedSlots, currentSlot)) {
        // Try preferred period first
        const primaryPeriod = preferredPeriod === 'morning' ? schedule.morning : schedule.afternoon;
        for (const slot of primaryPeriod) {
          if (!slot.supervisorId) {
            slot.supervisorId = supervisor.id;
            assignments.push({
              date: schedule.date,
              period: preferredPeriod,
              building: slot.building
            });
            break;
          }
        }
      } else {
        // Try alternative period if available
        const alternativePeriod = preferredPeriod === 'morning' ? 'afternoon' : 'morning';
        const alternativeSlot = {
          date: schedule.date,
          period: alternativePeriod
        };

        if (!hasTimeConflict(occupiedSlots, alternativeSlot)) {
          const secondaryPeriod = preferredPeriod === 'morning' ? schedule.afternoon : schedule.morning;
          for (const slot of secondaryPeriod) {
            if (!slot.supervisorId) {
              slot.supervisorId = supervisor.id;
              assignments.push({
                date: schedule.date,
                period: alternativePeriod,
                building: slot.building
              });
              break;
            }
          }
        }
      }
    });

    return {
      ...supervisor,
      assignments
    };
  });
};

export const assignProctors = (proctors: Proctor[], sessions: Session[]): Proctor[] => {
  const assignedProctors = proctors.map(proctor => ({
    ...proctor,
    assignedSessions: [] as Session[]
  }));

  // Sort sessions by date and period
  const sortedSessions = [...sessions].sort((a, b) => {
    const dateCompare = new Date(a.date).getTime() - new Date(b.date).getTime();
    if (dateCompare === 0) {
      return a.period === 'morning' ? -1 : 1;
    }
    return dateCompare;
  });

  // Distribute sessions while checking for time conflicts
  sortedSessions.forEach(session => {
    // Find proctor with least assignments who doesn't have a time conflict
    const availableProctor = assignedProctors
      .filter(proctor => {
        const occupiedSlots = getSessionTimeSlots(proctor.assignedSessions);
        return !hasTimeConflict(occupiedSlots, {
          date: new Date(session.date),
          period: session.period
        });
      })
      .sort((a, b) => {
        // Sort by number of assigned sessions and required sessions
        const aRequired = a.requiredSessions || Infinity;
        const bRequired = b.requiredSessions || Infinity;
        const aCount = a.assignedSessions.length;
        const bCount = b.assignedSessions.length;

        if (aCount >= aRequired && bCount < bRequired) return 1;
        if (bCount >= bRequired && aCount < aRequired) return -1;
        return aCount - bCount;
      })[0];

    if (availableProctor) {
      availableProctor.assignedSessions.push({
        ...session,
        date: new Date(session.date)
      });
    }
  });

  return assignedProctors;
};