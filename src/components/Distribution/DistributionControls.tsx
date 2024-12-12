import React from 'react';
import { Supervisor, Proctor, Session, AcademicPeriod } from '../../types';
import { DistributeButton } from './DistributeButton';
import { ExportButton } from './ExportButton';
import { DistributionCard } from './DistributionCard';

interface DistributionControlsProps {
  hasData: boolean;
  distribution: { supervisors: Supervisor[]; proctors: Proctor[] } | null;
  academicPeriod: AcademicPeriod;
  onDistribute: () => void;
  onExport: () => void;
}

export const DistributionControls = ({
  hasData,
  distribution,
  onDistribute,
  onExport,
}: DistributionControlsProps) => {
  if (!hasData) return null;

  return (
    <div className="space-y-4">
      <DistributionCard>
        <DistributeButton onDistribute={onDistribute} />
      </DistributionCard>

      <DistributionCard>
        <ExportButton onExport={onExport} disabled={false} />
      </DistributionCard>
    </div>
  );
};