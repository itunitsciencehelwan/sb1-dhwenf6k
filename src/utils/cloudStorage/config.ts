import { CloudStorageConfig } from './types';

export const SHAREPOINT_CONFIG: CloudStorageConfig = {
  baseUrl: 'https://sciencehelwanedu-my.sharepoint.com/:f:/g/personal/itunit_science_helwan_edu_eg/Etne8CRoTf1FjViE_RgnS_oBcSlAyPhYNUYl4hwEP_DRpw',
  credentials: 'include'
};

export const getFilename = (year: string, semester: string): string => 
  `exam-supervision-${year}-${semester}.json`;