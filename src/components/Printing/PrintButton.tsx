import React from 'react';
import { Printer } from 'lucide-react';

interface PrintButtonProps {
  onPrint: () => void;
  label: string;
}

export const PrintButton = ({ onPrint, label }: PrintButtonProps) => (
  <button
    onClick={onPrint}
    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
  >
    <Printer className="ml-2 h-5 w-5" />
    {label}
  </button>
);