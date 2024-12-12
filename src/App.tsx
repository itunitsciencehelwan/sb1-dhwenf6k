import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TabNavigation } from './components/Layout/TabNavigation';
import { FileUpload } from './components/FileUpload';
import { ManualEntrySection } from './components/ManualEntry/ManualEntrySection';
import { DataList } from './components/DataManagement/DataList';
import { DistributionControls } from './components/Distribution/DistributionControls';
import { importFromExcel } from './utils/excelUtils';
import { useDataManagement } from './hooks/useDataManagement';
import { useDistribution } from './hooks/useDistribution';
import { saveToStorage, loadFromStorage } from './utils/storage';
import { AcademicPeriod } from './types';
import { createInitialAcademicPeriod } from './utils/academicPeriod';

export function App() {
  const [activeTab, setActiveTab] = useState<'upload' | 'manual' | 'data'>('upload');
  const initialData = loadFromStorage() || {
    buildings: [],
    supervisors: [],
    proctors: [],
    sessions: [],
    academicPeriod: createInitialAcademicPeriod()
  };

  const { data, updateItem, deleteItem, addItem, setData } = useDataManagement(initialData);
  const { distribution, handleDistribute, handleExport } = useDistribution();

  useEffect(() => {
    if (distribution) {
      setData({
        ...data,
        supervisors: distribution.supervisors,
        proctors: distribution.proctors
      });
    }
  }, [distribution]);

  useEffect(() => {
    saveToStorage(data);
  }, [data]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const importedData = await importFromExcel(file);
      setData({ ...importedData, academicPeriod: data.academicPeriod });
    }
  };

  const handlePeriodChange = (newPeriod: AcademicPeriod) => {
    saveToStorage(data);
    const newData = loadFromStorage(newPeriod) || {
      buildings: [],
      supervisors: [],
      proctors: [],
      sessions: [],
      academicPeriod: newPeriod
    };
    setData(newData);
  };

  const handleExportClick = () => {
    handleExport(data.sessions);
  };

  const hasData = data.buildings.length > 0 && 
                 data.supervisors.length > 0 && 
                 data.proctors.length > 0 && 
                 data.sessions.length > 0;

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header 
        academicPeriod={data.academicPeriod}
        onPeriodChange={handlePeriodChange}
      />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-col gap-6">
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

            {activeTab === 'upload' && (
              <FileUpload onFileUpload={handleFileUpload} />
            )}

            {activeTab === 'manual' && (
              <ManualEntrySection
                buildings={data.buildings}
                onAddItem={addItem}
              />
            )}

            {activeTab === 'data' && (
              <DataList
                data={data}
                onDelete={deleteItem}
                onEdit={updateItem}
              />
            )}

            <DistributionControls
              hasData={hasData}
              distribution={distribution}
              academicPeriod={data.academicPeriod}
              onDistribute={() => handleDistribute(
                data.buildings,
                data.supervisors,
                data.proctors,
                data.sessions
              )}
              onExport={handleExportClick}
            />
          </div>
        </div>
      </main>
    </div>
  );
}