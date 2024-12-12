export const shuffleArray = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const calculateDistributionStats = (
  sessions: any[],
  assignedSessions: any[]
) => {
  return {
    totalSessions: sessions.length,
    assignedSessions: assignedSessions.length,
    unassignedSessions: sessions.length - assignedSessions.length,
    distributionPercentage: (assignedSessions.length / sessions.length) * 100
  };
};