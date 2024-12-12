import { Building, Proctor, Supervisor, Session } from '../../types';
import { shuffleArray } from './utils';
import { createDailySchedules } from './distributionHelpers';
import { hasTimeConflict, getAssignedTimeSlots } from './timeConflicts';

export const distributeSupervision = (
  buildings: Building[],
  supervisors: Supervisor[],
  proctors: Proctor[],
  sessions: Session[]
) => {
  // إنشاء جداول يومية
  const dailySchedules = createDailySchedules(sessions);
  const sortedSchedules = Array.from(dailySchedules.values())
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  // توزيع المشرفين بشكل عشوائي ومتوازن
  const assignedSupervisors = supervisors.map(supervisor => {
    const assignments = [];
    const availableSlots = [];

    // تجميع كل الفترات المتاحة
    sortedSchedules.forEach(schedule => {
      schedule.morning.forEach(slot => {
        if (!slot.supervisorId) {
          availableSlots.push({
            date: schedule.date,
            period: 'morning',
            building: slot.building
          });
        }
      });
      schedule.afternoon.forEach(slot => {
        if (!slot.supervisorId) {
          availableSlots.push({
            date: schedule.date,
            period: 'afternoon',
            building: slot.building
          });
        }
      });
    });

    // خلط الفترات المتاحة بشكل عشوائي
    shuffleArray(availableSlots);

    // محاولة تعيين فترات للمشرف مع مراعاة عدم التعارض
    for (const slot of availableSlots) {
      const occupiedSlots = getAssignedTimeSlots(assignments);
      if (!hasTimeConflict(occupiedSlots, {
        date: slot.date,
        period: slot.period
      })) {
        assignments.push(slot);
      }
    }

    return {
      ...supervisor,
      assignments
    };
  });

  // توزيع المراقبين بشكل عشوائي ومتوازن
  const assignedProctors = proctors.map(proctor => ({
    ...proctor,
    assignedSessions: []
  }));

  // تجميع كل الجلسات وخلطها عشوائياً
  const shuffledSessions = [...sessions].map(session => ({
    ...session,
    date: new Date(session.date)
  }));
  shuffleArray(shuffledSessions);

  // توزيع الجلسات على المراقبين بالتساوي
  const sessionsPerProctor = Math.ceil(sessions.length / proctors.length);

  shuffledSessions.forEach((session, index) => {
    const proctorIndex = index % assignedProctors.length;
    const proctor = assignedProctors[proctorIndex];

    // التحقق من عدم وجود تعارض في الوقت
    const occupiedSlots = getAssignedTimeSlots(proctor.assignedSessions);
    if (!hasTimeConflict(occupiedSlots, {
      date: session.date,
      period: session.period
    })) {
      // التحقق من عدم تجاوز العدد المطلوب من المراقبات
      if (!proctor.requiredSessions || proctor.assignedSessions.length < proctor.requiredSessions) {
        proctor.assignedSessions.push(session);
      }
    }
  });

  // إعادة توزيع الجلسات غير المسندة
  const unassignedSessions = shuffledSessions.filter(session => 
    !assignedProctors.some(proctor => 
      proctor.assignedSessions.some(assigned => 
        assigned.id === session.id
      )
    )
  );

  if (unassignedSessions.length > 0) {
    unassignedSessions.forEach(session => {
      // البحث عن مراقب متاح للجلسة
      const availableProctor = assignedProctors
        .filter(proctor => {
          const occupiedSlots = getAssignedTimeSlots(proctor.assignedSessions);
          return !hasTimeConflict(occupiedSlots, {
            date: session.date,
            period: session.period
          });
        })
        .sort((a, b) => a.assignedSessions.length - b.assignedSessions.length)[0];

      if (availableProctor) {
        availableProctor.assignedSessions.push(session);
      }
    });
  }

  return {
    supervisors: assignedSupervisors,
    proctors: assignedProctors
  };
};