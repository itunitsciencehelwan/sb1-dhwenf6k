import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PDFHeaderConfig, PDFTableConfig } from './types';

export class PDFGenerator {
  private doc: jsPDF;

  constructor() {
    this.doc = new jsPDF();
    this.doc.setR2L(true);
    // Set default font for better Arabic support
    this.doc.setFont("helvetica");
  }

  addHeader(config: PDFHeaderConfig): void {
    const { title, academicYear, semester, date } = config;
    
    this.doc.setFontSize(20);
    this.doc.text(title, this.doc.internal.pageSize.width / 2, 20, { 
      align: "center",
      direction: "rtl"
    });
    
    this.doc.setFontSize(12);
    this.doc.text(`العام الدراسي: ${academicYear}`, this.doc.internal.pageSize.width / 2, 30, { 
      align: "center",
      direction: "rtl"
    });
    this.doc.text(`الفصل الدراسي: ${semester}`, this.doc.internal.pageSize.width / 2, 40, { 
      align: "center",
      direction: "rtl"
    });
    this.doc.text(`تاريخ الإصدار: ${date}`, this.doc.internal.pageSize.width / 2, 50, { 
      align: "center",
      direction: "rtl"
    });
  }

  addTable(config: PDFTableConfig): void {
    const { startY, headers, data, theme, styles, headStyles, bodyStyles } = config;
    
    autoTable(this.doc, {
      startY,
      head: [headers],
      body: data,
      theme,
      styles: {
        ...styles,
        direction: 'rtl',
        font: 'helvetica'
      },
      headStyles: {
        ...headStyles,
        direction: 'rtl'
      },
      bodyStyles: {
        ...bodyStyles,
        direction: 'rtl'
      }
    });
  }

  save(filename: string): void {
    this.doc.save(filename);
  }
}