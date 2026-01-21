export const en_number_to_bn_number = (num: string | number): string => {
  const bn_digits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  const numStr = num.toString();
  let bn_num = '';

  for (let i = 0; i < numStr.length; i++) {
    const digit = parseInt(numStr[i]);
    if (!isNaN(digit)) {
      bn_num += bn_digits[digit];
    } else {
      bn_num += numStr[i];
    }
  }

  return bn_num;
};
