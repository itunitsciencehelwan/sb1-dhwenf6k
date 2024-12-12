export interface AcademicPeriod {
  id: string;
  year: string;
  semester: 'first' | 'second' | 'summer';
  isActive: boolean;
}

export interface Period {
  id: string;
  name: 'morning' | 'afternoon';
  startTime: string;
}