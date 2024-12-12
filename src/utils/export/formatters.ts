import { format } from 'date-fns';
import { Supervisor, Proctor } from '../../types';

const formatPeriod = (period: 'morning' | 'afternoon'): string => {
  return period === 'morning' ? 'صباحية' : 'مسائية';
};

export const createSupervisorsData = (supervisors: Supervisor[]) => {
  return supervisors.flatMap(supervisor =>
    supervisor.assignments.map(assignment => ({
      'الاسم': supervisor.name,
      'التاريخ': format(new Date(assignment.date), 'yyyy/MM/dd'),
      'الفترة': formatPeriod(assignment.period),
      'المبنى المخصص': assignment.building,
      'الفترة المفضلة': supervisor.preferredPeriod ? formatPeriod(supervisor.preferredPeriod) : 'بدون تفضيل'
    }))
  );
};

export const createProctorsData = (proctors: Proctor[]) => {
  return proctors.flatMap(proctor =>
    proctor.assignedSessions.map(session => ({
      'اسم المراقب': proctor.name,
      'التاريخ': format(new Date(session.date), 'yyyy/MM/dd'),
      'الفترة': formatPeriod(session.period),
      'المبنى': session.building,
      'القاعة': session.room,
      'عدد المراقبات المطلوبة': proctor.requiredSessions || 'غير محدد'
    }))
  );
};