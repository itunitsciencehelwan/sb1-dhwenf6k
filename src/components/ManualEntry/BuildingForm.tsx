import React, { useState } from 'react';
import { Building, Room } from '../../types';
import { Trash2 } from 'lucide-react';

interface BuildingFormProps {
  onSubmit: (building: Building) => void;
  initialData?: Building;
}

interface RoomFormData {
  id?: string;
  name: string;
  capacity: string;
  requiredProctors: string;
}

interface BuildingFormData {
  name: string;
  rooms: RoomFormData[];
}

export const BuildingForm = ({ onSubmit, initialData }: BuildingFormProps) => {
  const [building, setBuilding] = useState<BuildingFormData>(() => {
    if (initialData) {
      return {
        name: initialData.name,
        rooms: initialData.rooms.map(room => ({
          id: room.id,
          name: room.name,
          capacity: room.capacity.toString(),
          requiredProctors: room.requiredProctors.toString()
        }))
      };
    }
    return {
      name: '',
      rooms: [{ name: '', capacity: '', requiredProctors: '1' }]
    };
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: initialData?.id || crypto.randomUUID(),
      name: building.name,
      rooms: building.rooms.map(room => ({
        id: room.id || crypto.randomUUID(),
        name: room.name,
        capacity: parseInt(room.capacity) || 0,
        requiredProctors: parseInt(room.requiredProctors) || 1
      }))
    });
  };

  const handleRoomChange = (index: number, field: keyof RoomFormData, value: string) => {
    const newRooms = [...building.rooms];
    newRooms[index] = {
      ...newRooms[index],
      [field]: value
    };
    setBuilding({ ...building, rooms: newRooms });
  };

  const handleRemoveRoom = (index: number) => {
    if (building.rooms.length > 1) {
      const newRooms = building.rooms.filter((_, i) => i !== index);
      setBuilding({ ...building, rooms: newRooms });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-right">
      <div>
        <label className="block text-sm font-medium text-gray-700">اسم المبنى</label>
        <input
          type="text"
          value={building.name}
          onChange={(e) => setBuilding({ ...building, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
          required
        />
      </div>

      {building.rooms.map((room, index) => (
        <div key={room.id || index} className="space-y-2 bg-gray-50 p-4 rounded-lg relative">
          <div className="flex justify-between items-center mb-2">
            <button
              type="button"
              onClick={() => handleRemoveRoom(index)}
              className="text-red-600 hover:text-red-800"
              disabled={building.rooms.length === 1}
            >
              <Trash2 className="h-5 w-5" />
            </button>
            <h4 className="font-medium">القاعة {index + 1}</h4>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">اسم القاعة</label>
              <input
                type="text"
                value={room.name}
                onChange={(e) => handleRoomChange(index, 'name', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">السعة</label>
              <input
                type="number"
                value={room.capacity}
                onChange={(e) => handleRoomChange(index, 'capacity', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
                required
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">عدد المراقبين المطلوب</label>
              <input
                type="number"
                value={room.requiredProctors}
                onChange={(e) => handleRoomChange(index, 'requiredProctors', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
                required
                min="1"
              />
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setBuilding({
            ...building,
            rooms: [...building.rooms, { name: '', capacity: '', requiredProctors: '1' }]
          })}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          إضافة قاعة
        </button>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          {initialData ? 'حفظ التعديلات' : 'حفظ المبنى'}
        </button>
      </div>
    </form>
  );
};