import React from 'react';
import { Building } from '../../../types';
import { Trash2, Edit } from 'lucide-react';

interface BuildingsSectionProps {
  buildings: Building[];
  onEdit: (building: Building) => void;
  onDelete: (id: string) => void;
}

export const BuildingsSection: React.FC<BuildingsSectionProps> = ({
  buildings,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 text-right">المباني والقاعات</h3>
      </div>
      <div className="border-t border-gray-200">
        {buildings.map((building) => (
          <div key={building.id} className="px-4 py-5 sm:p-6 border-b border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-2 rtl:space-x-reverse">
                <button
                  onClick={() => onEdit(building)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onDelete(building.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
              <h4 className="text-lg font-medium">{building.name}</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-right">
              {building.rooms.map((room) => (
                <div key={room.id} className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium">{room.name}</p>
                  <p className="text-sm text-gray-600">السعة: {room.capacity}</p>
                  <p className="text-sm text-gray-600">عدد المراقبين: {room.requiredProctors}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};