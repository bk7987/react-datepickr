import getDay from 'date-fns/getDay';
import getDate from 'date-fns/getDate';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import sub from 'date-fns/sub';
import add from 'date-fns/add';
import { maxTime, minTime } from 'date-fns/constants';
import isWithinInterval from 'date-fns/isWithinInterval';
import { DateRange, DisabledRange, OptionalDateRange } from './types';

export const calcRangeOverflow = (range: DateRange) => {
  const start = sub(range.start, { days: getDay(range.start) });
  const end = add(range.end, { days: 6 - getDay(range.end) });
  return { start, end };
};

export const formatDateNumber = (date: Date, padded = false) => {
  const dateText = getDate(date).toString(10);
  return padded ? dateText.padStart(2, '0') : dateText;
};

export const calcRange = (date: Date): DateRange => {
  return {
    start: startOfMonth(date),
    end: endOfMonth(date),
  };
};

export const inRange = (date: Date, range?: DateRange | DisabledRange | boolean): boolean => {
  if (!range) {
    return false;
  }

  if (isBoolean(range)) {
    return range;
  }

  if (Array.isArray(range)) {
    return inRangeArray(date, range);
  }

  return isWithinInterval(date, { start: range.start || minTime, end: range.end || maxTime });
};

export const inRangeArray = (date: Date, ranges: OptionalDateRange[]) => {
  for (let range of ranges) {
    if (inRange(date, range)) {
      return true;
    }
  }
  return false;
};

export const isBoolean = (value: unknown): value is boolean => {
  return (
    value === true || value === false || (isObjectLike(value) && toString.call(value) === 'boolean')
  );
};

export const isObjectLike = (value: unknown): value is Object => {
  return value != null && typeof value == 'object';
};
