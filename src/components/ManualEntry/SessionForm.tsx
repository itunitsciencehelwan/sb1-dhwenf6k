import React, { useState } from 'react';
import { Session, Building } from '../../types';
import { format } from 'date-fns';

interface SessionFormProps {
  buildings: Building[];
  onSubmit: (session: Session) => void;
  initialData?: Session;
}

export const SessionForm = ({ buildings, onSubmit, initialData }: SessionFormProps) => {
  const [session, setSession] = useState({
    date: initialData ? format(new Date(initialData.date), 'yyyy-MM-dd') : '',
    period: initialData?.period || 'morning' as 'morning' | 'afternoon',
    building: initialData?.building || '',
    room: initialData?.room || '',
  });

  const selectedBuilding = buildings.find(b => b.name === session.building);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: initialData?.id || crypto.randomUUID(),
      date: new Date(session.date),
      period: session.period,
      building: session.building,
      room: session.room,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-right">
      <div>
        <label className="block text-sm font-medium text-gray-700">التاريخ</label>
        <input
          type="date"
          value={session.date}
          onChange={(e) => setSession({ ...session, date: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">الفترة</label>
        <select
          value={session.period}
          onChange={(e) => setSession({ ...session, period: e.target.value as 'morning' | 'afternoon' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
          required
        >
          <option value="morning">صباحية</option>
          <option value="afternoon">مسائية</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">المبنى</label>
        <select
          value={session.building}
          onChange={(e) => setSession({ ...session, building: e.target.value, room: '' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
          required
        >
          <option value="">اختر المبنى</option>
          {buildings.map((building) => (
            <option key={building.id} value={building.name}>
              {building.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">القاعة</label>
        <select
          value={session.room}
          onChange={(e) => setSession({ ...session, room: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
          required
          disabled={!selectedBuilding}
        >
          <option value="">اختر القاعة</option>
          {selectedBuilding?.rooms.map((room) => (
            <option key={room.id} value={room.name}>
              {room.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        {initialData ? 'حفظ التعديلات' : 'إضافة جلسة'}
      </button>
    </form>
  );
};