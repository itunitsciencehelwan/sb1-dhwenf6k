import { DataState } from '../types';

const SHAREPOINT_BASE_URL = 'https://sciencehelwanedu-my.sharepoint.com/:f:/g/personal/itunit_science_helwan_edu_eg/Etne8CRoTf1FjViE_RgnS_oBcSlAyPhYNUYl4hwEP_DRpw';

interface CloudStorageResponse {
  success: boolean;
  message: string;
  data?: any;
}

export class CloudStorageService {
  private static instance: CloudStorageService;
  private isAuthenticated: boolean = false;

  private constructor() {}

  static getInstance(): CloudStorageService {
    if (!CloudStorageService.instance) {
      CloudStorageService.instance = new CloudStorageService();
    }
    return CloudStorageService.instance;
  }

  async initialize(): Promise<CloudStorageResponse> {
    try {
      // Check if we can access the SharePoint site
      const response = await fetch(`${SHAREPOINT_BASE_URL}?e=qRBtYm`, {
        method: 'HEAD',
        credentials: 'include'
      });

      this.isAuthenticated = response.ok;
      
      return {
        success: this.isAuthenticated,
        message: this.isAuthenticated ? 'تم الاتصال بالتخزين السحابي بنجاح' : 'فشل الاتصال بالتخزين السحابي'
      };
    } catch (error) {
      console.error('Cloud storage initialization error:', error);
      return {
        success: false,
        message: 'حدث خطأ أثناء الاتصال بالتخزين السحابي'
      };
    }
  }

  async saveData(data: DataState): Promise<CloudStorageResponse> {
    if (!this.isAuthenticated) {
      return {
        success: false,
        message: 'لم يتم الاتصال بالتخزين السحابي'
      };
    }

    try {
      const filename = `exam-supervision-${data.academicPeriod.year}-${data.academicPeriod.semester}.json`;
      
      // Create blob and upload to SharePoint
      const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
      const formData = new FormData();
      formData.append('file', blob, filename);

      const response = await fetch(`${SHAREPOINT_BASE_URL}/upload`, {
        method: 'POST',
        credentials: 'include',
        body: formData
      });

      return {
        success: response.ok,
        message: response.ok ? 'تم حفظ البيانات بنجاح' : 'فشل حفظ البيانات'
      };
    } catch (error) {
      console.error('Cloud storage save error:', error);
      return {
        success: false,
        message: 'حدث خطأ أثناء حفظ البيانات'
      };
    }
  }

  async loadData(academicPeriod: { year: string; semester: string }): Promise<CloudStorageResponse> {
    if (!this.isAuthenticated) {
      return {
        success: false,
        message: 'لم يتم الاتصال بالتخزين السحابي'
      };
    }

    try {
      const filename = `exam-supervision-${academicPeriod.year}-${academicPeriod.semester}.json`;
      
      const response = await fetch(`${SHAREPOINT_BASE_URL}/download/${filename}`, {
        credentials: 'include'
      });

      if (!response.ok) {
        return {
          success: false,
          message: 'لم يتم العثور على البيانات'
        };
      }

      const data = await response.json();
      return {
        success: true,
        message: 'تم تحميل البيانات بنجاح',
        data
      };
    } catch (error) {
      console.error('Cloud storage load error:', error);
      return {
        success: false,
        message: 'حدث خطأ أثناء تحميل البيانات'
      };
    }
  }
}