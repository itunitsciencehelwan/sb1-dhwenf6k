import React, { useState } from 'react';
import { Proctor } from '../../types';

interface ProctorFormProps {
  onSubmit: (proctor: Proctor) => void;
  initialData?: Proctor;
}

export const ProctorForm = ({ onSubmit, initialData }: ProctorFormProps) => {
  const [proctor, setProctor] = useState({
    name: initialData?.name || '',
    requiredSessions: initialData?.requiredSessions,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: initialData?.id || crypto.randomUUID(),
      name: proctor.name,
      requiredSessions: proctor.requiredSessions,
      assignedSessions: initialData?.assignedSessions || [],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-right">
      <div>
        <label className="block text-sm font-medium text-gray-700">اسم المراقب</label>
        <input
          type="text"
          value={proctor.name}
          onChange={(e) => setProctor({ ...proctor, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">عدد المراقبات المطلوبة (اختياري)</label>
        <input
          type="number"
          value={proctor.requiredSessions || ''}
          onChange={(e) => setProctor({ ...proctor, requiredSessions: e.target.value ? parseInt(e.target.value) : undefined })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
          min="1"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        {initialData ? 'حفظ التعديلات' : 'إضافة مراقب'}
      </button>
    </form>
  );
};