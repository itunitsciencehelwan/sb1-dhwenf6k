import React from 'react';

interface ViewTypeSelectorProps {
  viewType: 'all' | 'individual';
  onViewTypeChange: (viewType: 'all' | 'individual') => void;
}

export const ViewTypeSelector: React.FC<ViewTypeSelectorProps> = ({
  viewType,
  onViewTypeChange
}) => {
  return (
    <div className="flex justify-end space-x-4 rtl:space-x-reverse">
      <button
        onClick={() => onViewTypeChange('individual')}
        className={`px-4 py-2 rounded-md ${
          viewType === 'individual'
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        عرض فردي
      </button>
      <button
        onClick={() => onViewTypeChange('all')}
        className={`px-4 py-2 rounded-md ${
          viewType === 'all'
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        عرض الكل
      </button>
    </div>
  );
};