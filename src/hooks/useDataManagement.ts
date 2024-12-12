import { useState } from 'react';
import { Building, Supervisor, Proctor, Session } from '../types';

interface DataState {
  buildings: Building[];
  supervisors: Supervisor[];
  proctors: Proctor[];
  sessions: Session[];
}

export const useDataManagement = (initialData: DataState) => {
  const [data, setData] = useState<DataState>(initialData);

  const updateItem = (type: string, updatedItem: any) => {
    setData(prevData => ({
      ...prevData,
      [type + 's']: prevData[type + 's' as keyof DataState].map(item =>
        item.id === updatedItem.id ? updatedItem : item
      )
    }));
  };

  const deleteItem = (type: string, id: string) => {
    setData(prevData => ({
      ...prevData,
      [type + 's']: prevData[type + 's' as keyof DataState].filter(item => item.id !== id)
    }));
  };

  const addItem = (type: string, newItem: any) => {
    setData(prevData => ({
      ...prevData,
      [type + 's']: [...prevData[type + 's' as keyof DataState], newItem]
    }));
  };

  return {
    data,
    updateItem,
    deleteItem,
    addItem,
    setData
  };
};