import { Building, Proctor, Supervisor, Session, SupervisorAssignment } from '../types';

export const distributeSupervision = (
  buildings: Building[],
  supervisors: Supervisor[],
  proctors: Proctor[],
  sessions: Session[]
) => {
  // تجميع الجلسات حسب التاريخ والفترة
  const dailySchedules = new Map<string, {
    date: Date;
    morning: { building: string; supervisorId?: string }[];
    afternoon: { building: string; supervisorId?: string }[];
  }>();
  
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

  // تحويل Map إلى مصفوفة مرتبة حسب التاريخ
  const sortedSchedules = Array.from(dailySchedules.values())
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  // تعيين المشرفين مع مراعاة الفترات المفضلة
  const assignedSupervisors = supervisors.map(supervisor => {
    const assignments: SupervisorAssignment[] = [];
    const preferredPeriod = supervisor.preferredPeriod || 
      (Math.random() > 0.5 ? 'morning' : 'afternoon');

    sortedSchedules.forEach(schedule => {
      const primaryPeriod = preferredPeriod === 'morning' ? schedule.morning : schedule.afternoon;
      const secondaryPeriod = preferredPeriod === 'morning' ? schedule.afternoon : schedule.morning;

      let assigned = false;
      
      // محاولة التعيين في الفترة المفضلة
      for (const slot of primaryPeriod) {
        if (!slot.supervisorId) {
          slot.supervisorId = supervisor.id;
          assignments.push({
            date: schedule.date,
            period: preferredPeriod,
            building: slot.building
          });
          assigned = true;
          break;
        }
      }

      // إذا لم يتم التعيين في الفترة المفضلة، نحاول في الفترة الأخرى
      if (!assigned) {
        for (const slot of secondaryPeriod) {
          if (!slot.supervisorId) {
            slot.supervisorId = supervisor.id;
            assignments.push({
              date: schedule.date,
              period: preferredPeriod === 'morning' ? 'afternoon' : 'morning',
              building: slot.building
            });
            break;
          }
        }
      }
    });

    return {
      ...supervisor,
      assignments
    };
  });

  // توزيع المراقبين
  const totalSessions = sessions.length;
  const baseSessionsPerProctor = Math.floor(totalSessions / proctors.length);
  
  const assignedProctors = proctors.map(proctor => ({
    ...proctor,
    assignedSessions: [] as Session[]
  }));

  let remainingSessions = [...sessions].map(session => ({
    ...session,
    date: new Date(session.date)
  }));

  // First, assign sessions to proctors with specific requirements
  assignedProctors.forEach(proctor => {
    if (proctor.requiredSessions) {
      const sessionsToAssign = remainingSessions
        .slice(0, proctor.requiredSessions)
        .map(session => ({ ...session }));
      
      proctor.assignedSessions = sessionsToAssign;
      remainingSessions = remainingSessions.slice(proctor.requiredSessions);
    }
  });

  // Then, distribute remaining sessions evenly
  assignedProctors
    .filter(proctor => !proctor.requiredSessions)
    .forEach(proctor => {
      const sessionsToAssign = remainingSessions
        .slice(0, baseSessionsPerProctor)
        .map(session => ({ ...session }));
      
      proctor.assignedSessions = sessionsToAssign;
      remainingSessions = remainingSessions.slice(baseSessionsPerProctor);
    });

  // Distribute any remaining sessions
  let proctorIndex = 0;
  while (remainingSessions.length > 0) {
    if (proctorIndex >= assignedProctors.length) {
      proctorIndex = 0;
    }
    
    assignedProctors[proctorIndex].assignedSessions.push({ ...remainingSessions[0] });
    remainingSessions = remainingSessions.slice(1);
    proctorIndex++;
  }

  return {
    supervisors: assignedSupervisors,
    proctors: assignedProctors,
  };
};