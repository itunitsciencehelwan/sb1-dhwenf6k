import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';
import { Supervisor, Proctor, AcademicPeriod } from '../types';

const addHeader = (doc: jsPDF, title: string, academicPeriod: AcademicPeriod) => {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(title, doc.internal.pageSize.width / 2, 20, { align: "center" });
  
  doc.setFontSize(12);
  doc.text(`العام الدراسي: ${academicPeriod.year}`, doc.internal.pageSize.width / 2, 30, { align: "center" });
  
  const semester = academicPeriod.semester === 'first' ? 'الفصل الأول' :
                  academicPeriod.semester === 'second' ? 'الفصل الثاني' :
                  'الفصل الصيفي';
  doc.text(`الفصل الدراسي: ${semester}`, doc.internal.pageSize.width / 2, 40, { align: "center" });
  
  doc.text(`تاريخ الإصدار: ${format(new Date(), 'yyyy/MM/dd')}`, doc.internal.pageSize.width / 2, 50, { align: "center" });
};

export const exportSupervisorScheduleToPDF = (supervisor: Supervisor, academicPeriod: AcademicPeriod) => {
  const doc = new jsPDF();
  doc.setR2L(true);

  addHeader(doc, `جدول إشراف: ${supervisor.name}`, academicPeriod);

  const tableData = supervisor.assignments.map(assignment => [
    format(new Date(assignment.date), 'yyyy/MM/dd'),
    assignment.period === 'morning' ? 'صباحية' : 'مسائية',
    assignment.building
  ]);

  autoTable(doc, {
    startY: 60,
    head: [['التاريخ', 'الفترة', 'المبنى']],
    body: tableData,
    theme: 'grid',
    styles: { font: 'helvetica', halign: 'right' },
    headStyles: { fillColor: [66, 66, 66] }
  });

  doc.save(`جدول-اشراف-${supervisor.name}.pdf`);
};

export const exportProctorScheduleToPDF = (proctor: Proctor, academicPeriod: AcademicPeriod) => {
  const doc = new jsPDF();
  doc.setR2L(true);

  addHeader(doc, `جدول مراقبة: ${proctor.name}`, academicPeriod);

  const tableData = proctor.assignedSessions.map(session => [
    format(new Date(session.date), 'yyyy/MM/dd'),
    session.period === 'morning' ? 'صباحية' : 'مسائية',
    session.building,
    session.room
  ]);

  autoTable(doc, {
    startY: 60,
    head: [['التاريخ', 'الفترة', 'المبنى', 'القاعة']],
    body: tableData,
    theme: 'grid',
    styles: { font: 'helvetica', halign: 'right' },
    headStyles: { fillColor: [66, 66, 66] }
  });

  doc.save(`جدول-مراقبة-${proctor.name}.pdf`);
};