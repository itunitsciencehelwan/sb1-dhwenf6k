import * as XLSX from 'xlsx';
import { Building, Proctor, Supervisor, Session } from '../types';
import {
  parseBuildingsFromExcel,
  parseSupervisorsFromExcel,
  parseProctorsFromExcel,
  parseSessionsFromExcel
} from './excel/importHelpers';
import {
  createSupervisorsData,
  createProctorsData,
  createTemplateData
} from './excel/exportHelpers';
import { loadFromStorage } from './storage';

export const importFromExcel = async (file: File) => {
  return new Promise<{
    buildings: Building[];
    supervisors: Supervisor[];
    proctors: Proctor[];
    sessions: Session[];
  }>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        const buildingsRaw = XLSX.utils.sheet_to_json(workbook.Sheets['المباني']);
        const supervisorsRaw = XLSX.utils.sheet_to_json(workbook.Sheets['المشرفين']);
        const proctorsRaw = XLSX.utils.sheet_to_json(workbook.Sheets['المراقبين']);
        const sessionsRaw = XLSX.utils.sheet_to_json(workbook.Sheets['الجلسات']);

        resolve({
          buildings: parseBuildingsFromExcel(buildingsRaw),
          supervisors: parseSupervisorsFromExcel(supervisorsRaw),
          proctors: parseProctorsFromExcel(proctorsRaw),
          sessions: parseSessionsFromExcel(sessionsRaw),
        });
      } catch (error) {
        reject(new Error('Failed to parse Excel file. Please make sure you are using the correct template.'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read Excel file.'));
    };

    reader.readAsArrayBuffer(file);
  });
};

export const exportToExcel = (sessions: Session[], filename: string) => {
  // Load the latest distribution from storage
  const storedData = loadFromStorage();
  if (!storedData) return;

  const { supervisors, proctors } = storedData;

  const workbook = XLSX.utils.book_new();

  // إنشاء ورقة المشرفين مع التواريخ والفترات
  const supervisorsData = createSupervisorsData(supervisors);
  const supervisorsSheet = XLSX.utils.json_to_sheet(supervisorsData);
  XLSX.utils.book_append_sheet(workbook, supervisorsSheet, 'المشرفين');

  // إنشاء ورقة المراقبين
  const proctorsData = createProctorsData(proctors);
  const proctorsSheet = XLSX.utils.json_to_sheet(proctorsData);
  XLSX.utils.book_append_sheet(workbook, proctorsSheet, 'جدول المراقبين');

  XLSX.writeFile(workbook, filename);
};

export const generateTemplateFile = () => {
  const workbook = XLSX.utils.book_new();
  const templateData = createTemplateData();

  // إضافة أوراق النموذج
  const sheets = {
    'المباني': templateData.buildings,
    'المشرفين': templateData.supervisors,
    'المراقبين': templateData.proctors,
    'الجلسات': templateData.sessions,
  };

  Object.entries(sheets).forEach(([sheetName, data]) => {
    const sheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, sheet, sheetName);
  });

  XLSX.writeFile(workbook, 'نموذج-توزيع-المراقبات.xlsx');
};