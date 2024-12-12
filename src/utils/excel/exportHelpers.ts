import { format } from 'date-fns';
import { Supervisor, Proctor, Session } from '../../types';

export const formatPeriod = (period: 'morning' | 'afternoon'): string => {
  return period === 'morning' ? 'صباحية' : 'مسائية';
};

export const createSupervisorsData = (supervisors: Supervisor[]) => {
  return supervisors.flatMap(supervisor =>
    supervisor.assignments.map(assignment => ({
      'الاسم': supervisor.name,
      'التاريخ': format(new Date(assignment.date), 'yyyy-MM-dd'),
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
      'التاريخ': format(new Date(session.date), 'yyyy-MM-dd'),
      'الفترة': formatPeriod(session.period),
      'المبنى': session.building,
      'القاعة': session.room,
    }))
  );
};

export const createTemplateData = () => ({
  buildings: [
    { 'اسم المبنى': 'مبنى 1', 'اسم القاعة': '101', 'عدد المراقبين المطلوب': 2 },
    { 'اسم المبنى': 'مبنى 1', 'اسم القاعة': '102', 'عدد المراقبين المطلوب': 2 },
  ],
  supervisors: [
    { 'الاسم': 'مشرف 1' },
    { 'الاسم': 'مشرف 2' }
  ],
  proctors: [
    { 'الاسم': 'مراقب 1', 'عدد المراقبات المطلوبة': 4 },
    { 'الاسم': 'مراقب 2', 'عدد المراقبات المطلوبة': 3 },
  ],
  sessions: [
    { 'التاريخ': '2024-03-20', 'الفترة': 'صباحية', 'المبنى': 'مبنى 1', 'القاعة': '101' },
    { 'التاريخ': '2024-03-20', 'الفترة': 'مسائية', 'المبنى': 'مبنى 1', 'القاعة': '102' },
  ]
});