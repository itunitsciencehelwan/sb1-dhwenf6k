import React from 'react';
import { Cloud, CloudOff, Loader } from 'lucide-react';

interface CloudStorageStatusProps {
  isInitialized: boolean;
  isLoading: boolean;
  error: string | null;
}

export const CloudStorageStatus: React.FC<CloudStorageStatusProps> = ({
  isInitialized,
  isLoading,
  error
}) => {
  return (
    <div className="flex items-center gap-2 text-sm">
      {isLoading ? (
        <Loader className="h-4 w-4 animate-spin text-indigo-600" />
      ) : isInitialized ? (
        <Cloud className="h-4 w-4 text-green-600" />
      ) : (
        <CloudOff className="h-4 w-4 text-red-600" />
      )}
      
      <span className={`${error ? 'text-red-600' : isInitialized ? 'text-green-600' : 'text-gray-600'}`}>
        {error ? error :
         isLoading ? 'جاري الاتصال...' :
         isInitialized ? 'متصل بالتخزين السحابي' :
         'غير متصل بالتخزين السحابي'}
      </span>
    </div>
  );
};