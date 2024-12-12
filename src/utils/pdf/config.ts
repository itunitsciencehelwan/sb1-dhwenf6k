import { PDFTableConfig } from './types';

export const SUPERVISOR_TABLE_CONFIG: Omit<PDFTableConfig, 'data'> = {
  startY: 60,
  headers: ['المبنى', 'الفترة', 'التاريخ'],
  theme: 'grid',
  styles: {
    font: 'helvetica',
    halign: 'right',
    direction: 'rtl'
  },
  headStyles: {
    fillColor: [66, 66, 66],
    textColor: [255, 255, 255],
    fontSize: 12,
    fontStyle: 'bold'
  },
  bodyStyles: {
    fontSize: 11
  }
};

export const PROCTOR_TABLE_CONFIG: Omit<PDFTableConfig, 'data'> = {
  startY: 60,
  headers: ['القاعة', 'المبنى', 'الفترة', 'التاريخ'],
  theme: 'grid',
  styles: {
    font: 'helvetica',
    halign: 'right',
    direction: 'rtl'
  },
  headStyles: {
    fillColor: [66, 66, 66],
    textColor: [255, 255, 255],
    fontSize: 12,
    fontStyle: 'bold'
  },
  bodyStyles: {
    fontSize: 11
  }
};