import React from 'react';

interface TabNavigationProps {
  activeTab: 'upload' | 'manual' | 'data';
  onTabChange: (tab: 'upload' | 'manual' | 'data') => void;
}

export const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  const getTabClasses = (tab: 'upload' | 'manual' | 'data') =>
    `${
      activeTab === tab
        ? 'border-indigo-500 text-indigo-600'
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ml-8`;

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex">
        <button
          onClick={() => onTabChange('upload')}
          className={getTabClasses('upload')}
        >
          رفع ملف
        </button>
        <button
          onClick={() => onTabChange('manual')}
          className={getTabClasses('manual')}
        >
          إدخال يدوي
        </button>
        <button
          onClick={() => onTabChange('data')}
          className={getTabClasses('data')}
        >
          عرض البيانات
        </button>
      </nav>
    </div>
  );
};