import * as XLSX from 'xlsx';
import { Supervisor, Proctor, Session } from '../../types';
import { createSupervisorsData, createProctorsData } from './formatters';
import { getDistributionTimestamp } from '../storage/distributionStorage';
import { format } from 'date-fns';

export const exportDistributionToExcel = (
  distribution: {
    supervisors: Supervisor[];
    proctors: Proctor[];
  },
  sessions: Session[]
) => {
  const timestamp = getDistributionTimestamp();
  const dateStr = timestamp ? format(timestamp, 'yyyy-MM-dd') : 'latest';
  const filename = `توزيع-المراقبات-${dateStr}.xlsx`;

  const workbook = XLSX.utils.book_new();

  // إنشاء ورقة المشرفين
  const supervisorsData = createSupervisorsData(distribution.supervisors);
  const supervisorsSheet = XLSX.utils.json_to_sheet(supervisorsData);
  XLSX.utils.book_append_sheet(workbook, supervisorsSheet, 'المشرفين');

  // إنشاء ورقة المراقبين
  const proctorsData = createProctorsData(distribution.proctors);
  const proctorsSheet = XLSX.utils.json_to_sheet(proctorsData);
  XLSX.utils.book_append_sheet(workbook, proctorsSheet, 'جدول المراقبين');

  // إضافة معلومات التوزيع
  if (timestamp) {
    const infoSheet = XLSX.utils.aoa_to_sheet([
      ['تاريخ التوزيع', format(timestamp, 'yyyy/MM/dd HH:mm:ss')],
      ['عدد المشرفين', distribution.supervisors.length.toString()],
      ['عدد المراقبين', distribution.proctors.length.toString()],
      ['عدد الجلسات', sessions.length.toString()]
    ]);
    XLSX.utils.book_append_sheet(workbook, infoSheet, 'معلومات التوزيع');
  }

  XLSX.writeFile(workbook, filename);
};