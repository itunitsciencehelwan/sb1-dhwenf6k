import React from 'react';
import { Download } from 'lucide-react';

interface ExportButtonProps {
  onExport: () => void;
  disabled?: boolean;
}

export const ExportButton = ({ onExport, disabled }: ExportButtonProps) => {
  return (
    <button
      onClick={onExport}
      disabled={disabled}
      className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
        disabled 
          ? 'bg-blue-400 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-700'
      }`}
    >
      <Download className="ml-2 h-5 w-5" />
      تصدير النتائج
    </button>
  );
};