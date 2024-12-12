import React from 'react';
import { Building, Supervisor, Proctor, Session } from '../../types';
import { format } from 'date-fns';

interface DataTableProps {
  data: {
    buildings?: Building[];
    supervisors?: Supervisor[];
    proctors?: Proctor[];
    sessions?: Session[];
  };
  type: 'buildings' | 'supervisors' | 'proctors' | 'sessions';
  onDelete: (id: string) => void;
}

export const DataTable = ({ data, type, onDelete }: DataTableProps) => {
  const renderTableContent = () => {
    switch (type) {
      case 'buildings':
        return (
          <>
            <thead>
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  اسم المبنى
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  عدد القاعات
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">حذف</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {(data.buildings || []).map((building) => (
                <tr key={building.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-right">{building.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">{building.rooms.length}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-left">
                    <button
                      onClick={() => onDelete(building.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </>
        );

      case 'supervisors':
        return (
          <>
            <thead>
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  اسم المشرف
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الفترة المفضلة
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">حذف</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {(data.supervisors || []).map((supervisor) => (
                <tr key={supervisor.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-right">{supervisor.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    {supervisor.preferredPeriod === 'morning' ? 'صباحية' : 
                     supervisor.preferredPeriod === 'afternoon' ? 'مسائية' : 'بدون تفضيل'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left">
                    <button
                      onClick={() => onDelete(supervisor.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </>
        );

      // Add similar cases for proctors and sessions
      default:
        return null;
    }
  };

  return (
    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        {renderTableContent()}
      </table>
    </div>
  );
};