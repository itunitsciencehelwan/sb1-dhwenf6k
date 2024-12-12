import React, { useState } from 'react';
import { Period } from '../../types';

interface PeriodSettingsProps {
  periods: Period[];
  onSave: (periods: Period[]) => void;
}

export const PeriodSettings = ({ periods, onSave }: PeriodSettingsProps) => {
  const [localPeriods, setLocalPeriods] = useState<Period[]>(periods);

  const handleTimeChange = (periodId: string, time: string) => {
    setLocalPeriods(prev =>
      prev.map(p =>
        p.id === periodId ? { ...p, startTime: time } : p
      )
    );
  };

  const handleSave = () => {
    onSave(localPeriods);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-right">إعدادات الفترات</h3>
      <div className="grid gap-4">
        {localPeriods.map(period => (
          <div key={period.id} className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              {period.name === 'morning' ? 'الفترة الصباحية' : 'الفترة المسائية'}
            </label>
            <input
              type="time"
              value={period.startTime}
              onChange={(e) => handleTimeChange(period.id, e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
            />
          </div>
        ))}
      </div>
      <button
        onClick={handleSave}
        className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        حفظ التغييرات
      </button>
    </div>
  );
};