import { useState } from 'react';
import { Building, Supervisor, Proctor, Session } from '../types';
import { distributeSupervision } from '../utils/distribution/distributionAlgorithm';
import { exportDistributionToExcel } from '../utils/export/excelExporter';
import { saveDistribution, loadDistribution } from '../utils/storage/distributionStorage';

export const useDistribution = () => {
  const [distribution, setDistribution] = useState<{
    supervisors: Supervisor[];
    proctors: Proctor[];
  } | null>(loadDistribution());

  const handleDistribute = (
    buildings: Building[],
    supervisors: Supervisor[],
    proctors: Proctor[],
    sessions: Session[]
  ) => {
    if (buildings.length && supervisors.length && proctors.length && sessions.length) {
      const result = distributeSupervision(buildings, supervisors, proctors, sessions);
      setDistribution(result);
      saveDistribution(result);
    }
  };

  const handleExport = (sessions: Session[]) => {
    const savedDistribution = loadDistribution();
    if (savedDistribution) {
      exportDistributionToExcel(savedDistribution, sessions);
    }
  };

  return {
    distribution,
    handleDistribute,
    handleExport,
  };
};