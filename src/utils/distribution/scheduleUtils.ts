import { Session, Building } from '../types';
import { DailySchedule } from './types';

export const createDailySchedules = (sessions: Session[]): Map<string, DailySchedule> => {
  const dailySchedules = new Map<string, DailySchedule>();

  sessions.forEach(session => {
    const dateStr = session.date.toISOString().split('T')[0];
    if (!dailySchedules.has(dateStr)) {
      dailySchedules.set(dateStr, {
        date: session.date,
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

export const getSortedSchedules = (dailySchedules: Map<string, DailySchedule>): DailySchedule[] => {
  return Array.from(dailySchedules.values())
    .sort((a, b) => a.date.getTime() - b.date.getTime());
};