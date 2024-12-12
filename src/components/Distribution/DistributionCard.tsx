import React from 'react';

interface DistributionCardProps {
  children: React.ReactNode;
}

export const DistributionCard = ({ children }: DistributionCardProps) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-end">
        {children}
      </div>
    </div>
  );
};