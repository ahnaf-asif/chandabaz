export interface DivisionType {
  id: string;
  name: string;
  bn_name: string;
}

export const ALL_DIVISIONS: DivisionType[] = [
  {
    id: '1',
    name: 'Chattagram',
    bn_name: 'চট্টগ্রাম',
  },
  {
    id: '2',
    name: 'Rajshahi',
    bn_name: 'রাজশাহী',
  },
  {
    id: '3',
    name: 'Khulna',
    bn_name: 'খুলনা',
  },
  {
    id: '4',
    name: 'Barisal',
    bn_name: 'বরিশাল',
  },
  {
    id: '5',
    name: 'Sylhet',
    bn_name: 'সিলেট',
  },
  {
    id: '6',
    name: 'Dhaka',
    bn_name: 'ঢাকা',
  },
  {
    id: '7',
    name: 'Rangpur',
    bn_name: 'রংপুর',
  },
  {
    id: '8',
    name: 'Mymensingh',
    bn_name: 'ময়মনসিংহ',
  },
];

const DEFAULT_DIVISION = ALL_DIVISIONS[0];

export const get_division_by_id = (id: string) => {
  const found = ALL_DIVISIONS.find((item) => item.id === id);
  return found || DEFAULT_DIVISION;
};

export const get_division_by_name = (name: string) => {
  const found = ALL_DIVISIONS.find((item) => item.name === name);
  return found || DEFAULT_DIVISION;
};

export const get_division_by_bn_name = (bn_name: string) => {
  const found = ALL_DIVISIONS.find((item) => item.bn_name === bn_name);
  return found || DEFAULT_DIVISION;
};
