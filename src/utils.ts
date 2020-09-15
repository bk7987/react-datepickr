import getDay from 'date-fns/getDay';
import getDate from 'date-fns/getDate';
import sub from 'date-fns/sub';
import add from 'date-fns/add';
import { DateRange } from './types';

export const calcRangeOverflow = (range: DateRange) => {
  const start = sub(range.start, { days: getDay(range.start) });
  const end = add(range.end, { days: 6 - getDay(range.end) });
  return { start, end };
};

export const formatDateNumber = (date: Date, padded = false) => {
  const dateText = getDate(date).toString(10);
  return padded ? dateText.padStart(2, '0') : dateText;
};
