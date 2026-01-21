import {
  IconSkull,
  IconHome2,
  IconCash,
  IconBuildingSkyscraper,
  IconBriefcase,
  IconDots,
} from '@tabler/icons-react';

interface ReportType {
  id: number;
  type_en: string;
  type_bn: string;
}

export const getReportTypeIcon = (id: number) => {
  switch (id) {
    case 1:
      return IconSkull;
    case 2:
      return IconHome2;
    case 3:
      return IconCash;
    case 4:
      return IconBuildingSkyscraper;
    case 5:
      return IconBriefcase;
    default:
      return IconDots;
  }
};

export const REPORT_TYPE_OPTIONS: ReportType[] = [
  { id: 1, type_en: 'Terrorism', type_bn: 'সন্ত্রাস' },
  { id: 2, type_en: 'Illegal Occupation', type_bn: 'দখলদারি' },
  { id: 3, type_en: 'Extortion', type_bn: 'চাঁদাবাজি' },
  { id: 4, type_en: 'Administrative Harassment', type_bn: 'প্রশাসনিক হয়রানি' },
  { id: 5, type_en: 'Business Harassment', type_bn: 'ব্যাবসায়িক হয়রানি' },
  { id: 6, type_en: 'Others', type_bn: 'অন্যান্য' },
];

const DEFAULT_REPORT_TYPE = REPORT_TYPE_OPTIONS.find((r) => r.id === 6)!;

export const get_report_type_by_id = (id: number): ReportType => {
  const reportType = REPORT_TYPE_OPTIONS.find((r) => r.id === id);
  return reportType || DEFAULT_REPORT_TYPE;
};

export const get_report_type_by_en = (t: string): ReportType => {
  const reportType = REPORT_TYPE_OPTIONS.find((r) => r.type_en === t);
  return reportType || DEFAULT_REPORT_TYPE;
};

export const get_report_type_by_bn = (t: string): ReportType => {
  const reportType = REPORT_TYPE_OPTIONS.find((r) => r.type_bn === t);
  return reportType || DEFAULT_REPORT_TYPE;
};
