export interface SeverityType {
  id: number;
  label_en: string;
  label_bn: string;
  text_en: string;
  text_bn: string;
}

export const SEVERITY_OPTIONS: SeverityType[] = [
  {
    id: 1,
    label_en: 'Mild Pressure',
    label_bn: 'হালকা চাপ',
    text_en: 'Verbal threat or pressure',
    text_bn: 'মৌখিক হুমকি বা চাপ',
  },
  {
    id: 2,
    label_en: 'Severe Threat',
    label_bn: 'গুরুতর হুমকি',
    text_en: 'Direct threat or intimidation',
    text_bn: 'সরাসরি হুমকি বা ভয় দেখানো',
  },
  {
    id: 3,
    label_en: 'Violence Involved',
    label_bn: 'সহিংসতা জড়িত',
    text_en: 'Physical attack or damage',
    text_bn: 'শারীরিক আক্রমণ বা ক্ষয়ক্ষতি',
  },
];

const DEFAULT_SEVERITY = SEVERITY_OPTIONS[0];

export const get_severity_by_id = (id: number): SeverityType => {
  const found = SEVERITY_OPTIONS.find((item) => item.id === id);
  return found || DEFAULT_SEVERITY;
};

export const get_severity_by_en = (label: string): SeverityType => {
  const found = SEVERITY_OPTIONS.find((item) => item.label_en === label);
  return found || DEFAULT_SEVERITY;
};

export const get_severity_by_bn = (label: string): SeverityType => {
  const found = SEVERITY_OPTIONS.find((item) => item.label_bn === label);
  return found || DEFAULT_SEVERITY;
};
