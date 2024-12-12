import { Building, Session } from '../types';
import { Period } from './periodUtils';

export const getBuildingsForPeriod = (
  buildings: Building[],
  sessions: Session[],
  period: Period
): Building[] => {
  const periodSessions = sessions.filter(s => s.period === period);
  const buildingNames = new Set(periodSessions.map(s => s.building));
  return buildings.filter(b => buildingNames.has(b.name));
};