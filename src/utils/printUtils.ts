export const printSchedule = (componentId: string) => {
  const printContent = document.getElementById(componentId);
  if (!printContent) return;

  // Create a new window for printing
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  // Add necessary styles
  const styles = `
    <style>
      @media print {
        body { direction: rtl; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: right; }
        th { background-color: #f8f9fa; }
        .print-container { padding: 20px; }
        @page { size: A4; margin: 2cm; }
      }
    </style>
  `;

  // Set the content
  printWindow.document.write(`
    <!DOCTYPE html>
    <html dir="rtl">
      <head>
        <title>طباعة الجدول</title>
        ${styles}
      </head>
      <body>
        ${printContent.innerHTML}
      </body>
    </html>
  `);

  printWindow.document.close();

  // Wait for images to load before printing
  printWindow.onload = () => {
    printWindow.print();
    printWindow.onafterprint = () => {
      printWindow.close();
    };
  };
};