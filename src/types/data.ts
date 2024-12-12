import { Building, Supervisor, Proctor, Session } from './entities';
import { AcademicPeriod } from './academic';

export interface DataState {
  buildings: Building[];
  supervisors: Supervisor[];
  proctors: Proctor[];
  sessions: Session[];
  academicPeriod: AcademicPeriod;
}