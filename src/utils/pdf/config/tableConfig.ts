import { PDFTableConfig } from '../types';
import { MESSAGES } from '../constants/messages';
import { PDF_STYLES } from '../constants/styles';

export const SUPERVISOR_TABLE_CONFIG: Omit<PDFTableConfig, 'data'> = {
  startY: 60,
  headers: [
    MESSAGES.TABLE_HEADERS.SUPERVISOR.BUILDING,
    MESSAGES.TABLE_HEADERS.SUPERVISOR.PERIOD,
    MESSAGES.TABLE_HEADERS.SUPERVISOR.DATE
  ],
  theme: 'grid',
  styles: PDF_STYLES.TABLE.COMMON,
  headStyles: PDF_STYLES.TABLE.HEAD,
  bodyStyles: PDF_STYLES.TABLE.BODY
};

export const PROCTOR_TABLE_CONFIG: Omit<PDFTableConfig, 'data'> = {
  startY: 60,
  headers: [
    MESSAGES.TABLE_HEADERS.PROCTOR.ROOM,
    MESSAGES.TABLE_HEADERS.PROCTOR.BUILDING,
    MESSAGES.TABLE_HEADERS.PROCTOR.PERIOD,
    MESSAGES.TABLE_HEADERS.PROCTOR.DATE
  ],
  theme: 'grid',
  styles: PDF_STYLES.TABLE.COMMON,
  headStyles: PDF_STYLES.TABLE.HEAD,
  bodyStyles: PDF_STYLES.TABLE.BODY
};