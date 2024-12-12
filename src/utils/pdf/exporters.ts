import { Supervisor, Proctor, AcademicPeriod } from '../../types';
import { PDFGenerator } from './generator';
import { createHeaderConfig } from './helpers/headerFormatter';
import { formatSupervisorData, formatProctorData } from './helpers/dataFormatters';
import { SUPERVISOR_TABLE_CONFIG, PROCTOR_TABLE_CONFIG } from './config/tableConfig';
import { MESSAGES } from './constants/messages';

export const exportSupervisorScheduleToPDF = (supervisor: Supervisor, academicPeriod: AcademicPeriod): void => {
  const pdfGenerator = new PDFGenerator();
  const headerConfig = createHeaderConfig(`جدول إشراف: ${supervisor.name}`, academicPeriod);
  
  pdfGenerator.addHeader(headerConfig);
  pdfGenerator.addTable({
    ...SUPERVISOR_TABLE_CONFIG,
    data: formatSupervisorData(supervisor)
  });
  
  pdfGenerator.save(`${MESSAGES.FILE_NAMES.SUPERVISOR_PREFIX}-${supervisor.name}.pdf`);
};

export const exportProctorScheduleToPDF = (proctor: Proctor, academicPeriod: AcademicPeriod): void => {
  const pdfGenerator = new PDFGenerator();
  const headerConfig = createHeaderConfig(`جدول مراقبة: ${proctor.name}`, academicPeriod);
  
  pdfGenerator.addHeader(headerConfig);
  pdfGenerator.addTable({
    ...PROCTOR_TABLE_CONFIG,
    data: formatProctorData(proctor)
  });
  
  pdfGenerator.save(`${MESSAGES.FILE_NAMES.PROCTOR_PREFIX}-${proctor.name}.pdf`);
};