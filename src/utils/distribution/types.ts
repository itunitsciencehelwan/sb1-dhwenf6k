export interface DailySchedule {
  date: Date;
  morning: { building: string; supervisorId?: string }[];
  afternoon: { building: string; supervisorId?: string }[];
}

export interface DistributionStats {
  totalSessions: number;
  assignedSessions: number;
  unassignedSessions: number;
  conflicts: {
    supervisor: number;
    proctor: number;
  };
}