import { parse } from 'date-fns';
import { Building, Supervisor, Proctor, Session } from '../../types';

export const parseBuildingsFromExcel = (buildingsRaw: any[]): Building[] => {
  const buildingsMap = new Map<string, Building>();
  
  buildingsRaw.forEach((row) => {
    if (!buildingsMap.has(row['اسم المبنى'])) {
      buildingsMap.set(row['اسم المبنى'], {
        id: crypto.randomUUID(),
        name: row['اسم المبنى'],
        rooms: [],
      });
    }

    const building = buildingsMap.get(row['اسم المبنى'])!;
    building.rooms.push({
      id: crypto.randomUUID(),
      name: row['اسم القاعة'],
      capacity: 0,
      requiredProctors: row['عدد المراقبين المطلوب'],
    });
  });

  return Array.from(buildingsMap.values());
};

export const parseSupervisorsFromExcel = (supervisorsRaw: any[]): Supervisor[] => {
  return supervisorsRaw.map((row) => ({
    id: crypto.randomUUID(),
    name: row['الاسم'],
    assignments: [],
  }));
};

export const parseProctorsFromExcel = (proctorsRaw: any[]): Proctor[] => {
  return proctorsRaw.map((row) => ({
    id: crypto.randomUUID(),
    name: row['الاسم'],
    requiredSessions: row['عدد المراقبات المطلوبة'],
    assignedSessions: [],
  }));
};

export const parseSessionsFromExcel = (sessionsRaw: any[]): Session[] => {
  return sessionsRaw.map((row) => ({
    id: crypto.randomUUID(),
    date: parse(row['التاريخ'], 'yyyy-MM-dd', new Date()),
    period: row['الفترة'] === 'صباحية' ? 'morning' : 'afternoon',
    building: row['المبنى'],
    room: row['القاعة'],
  }));
};