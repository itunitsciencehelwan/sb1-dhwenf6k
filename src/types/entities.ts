export interface Building {
  id: string;
  name: string;
  rooms: Room[];
}

export interface Room {
  id: string;
  name: string;
  capacity: number;
  requiredProctors: number;
}

export interface Supervisor {
  id: string;
  name: string;
  preferredPeriod?: 'morning' | 'afternoon';
  assignments: SupervisorAssignment[];
}

export interface SupervisorAssignment {
  date: Date;
  period: 'morning' | 'afternoon';
  building: string;
}

export interface Proctor {
  id: string;
  name: string;
  requiredSessions?: number;
  assignedSessions: Session[];
}

export interface Session {
  id: string;
  date: Date;
  period: 'morning' | 'afternoon';
  building: string;
  room: string;
}