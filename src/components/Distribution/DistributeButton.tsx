import React from 'react';
import { Building, Supervisor, Proctor, Session } from '../../types';

interface DistributeButtonProps {
  onDistribute: () => void;
}

export const DistributeButton = ({ onDistribute }: DistributeButtonProps) => {
  return (
    <button
      onClick={onDistribute}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
    >
      توزيع المراقبين والمشرفين
    </button>
  );
};