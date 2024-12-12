import React, { useState } from 'react';
import { Supervisor } from '../../types';

interface SupervisorFormProps {
  onSubmit: (supervisor: Supervisor) => void;
  initialData?: Supervisor;
}

export const SupervisorForm = ({ onSubmit, initialData }: SupervisorFormProps) => {
  const [supervisor, setSupervisor] = useState({
    name: initialData?.name || '',
    preferredPeriod: initialData?.preferredPeriod,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: initialData?.id || crypto.randomUUID(),
      name: supervisor.name,
      preferredPeriod: supervisor.preferredPeriod,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-right">
      <div>
        <label className="block text-sm font-medium text-gray-700">اسم المشرف</label>
        <input
          type="text"
          value={supervisor.name}
          onChange={(e) => setSupervisor({ ...supervisor, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">الفترة المفضلة</label>
        <select
          value={supervisor.preferredPeriod || ''}
          onChange={(e) => setSupervisor({ 
            ...supervisor, 
            preferredPeriod: e.target.value as 'morning' | 'afternoon' | undefined 
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
        >
          <option value="">بدون تفضيل</option>
          <option value="morning">صباحية</option>
          <option value="afternoon">مسائية</option>
        </select>
      </div>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        {initialData ? 'حفظ التعديلات' : 'إضافة مشرف'}
      </button>
    </form>
  );
};