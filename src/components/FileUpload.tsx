import React from 'react';
import { FileUp, Table } from 'lucide-react';
import { generateTemplateFile } from '../utils/excelUtils';

interface FileUploadProps {
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FileUpload = ({ onFileUpload }: FileUploadProps) => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="px-4 py-5 sm:p-6">
      <div className="flex flex-col gap-4">
        <button
          onClick={generateTemplateFile}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Table className="ml-2 h-5 w-5" />
          تحميل نموذج الإكسل
        </button>

        <label className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
          <FileUp className="ml-2 h-5 w-5" />
          رفع ملف البيانات
          <input
            type="file"
            className="hidden"
            accept=".xlsx,.xls"
            onChange={onFileUpload}
          />
        </label>
      </div>
    </div>
  </div>
);