export interface PDFHeaderConfig {
  title: string;
  academicYear: string;
  semester: string;
  date: string;
}

export interface PDFTableConfig {
  startY: number;
  headers: string[];
  data: string[][];
  theme: string;
  styles: {
    font: string;
    halign: string;
    direction: string;
  };
  headStyles: {
    fillColor: number[];
    textColor: number[];
    fontSize: number;
    fontStyle: string;
  };
  bodyStyles: {
    fontSize: number;
  };
}