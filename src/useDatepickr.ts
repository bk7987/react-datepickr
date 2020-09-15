import { useState } from 'react';
import toDate from 'date-fns/toDate';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import isWithinInterval from 'date-fns/isWithinInterval';
import { DateRange, PickrBag, PickrConfig, PickrDate } from './types';
import { calcRangeOverflow, formatDateNumber } from './utils';

export const useDatepickr = ({
  initialDate = new Date(),
  initialRange = {
    start: startOfMonth(new Date()),
    end: endOfMonth(new Date()),
  },
  rangeOverflow = 'blanks',
  dateDisplay = 'normal',
}: PickrConfig): PickrBag => {
  const [currentDate, setCurrentDate] = useState(toDate(initialDate));
  const [currentRange] = useState<DateRange>({
    start: toDate(initialRange.start),
    end: toDate(initialRange.end),
  });

  const onDateClicked = (date: Date) => {
    console.log(date);
    setCurrentDate(date);
  };

  const getPickrDates = (): PickrDate[] => {
    const { start, end } =
      rangeOverflow === 'none' ? currentRange : calcRangeOverflow(currentRange);
    const interval = eachDayOfInterval({ start, end });
    return interval.map((date, i) => {
      const inCurrentRange = isWithinInterval(date, currentRange);
      const label =
        inCurrentRange || rangeOverflow === 'dates'
          ? formatDateNumber(date, dateDisplay === 'padded')
          : '';
      return {
        key: i,
        label,
        onClick: () => onDateClicked(date),
        inCurrentRange,
      };
    });
  };

  return {
    dates: getPickrDates(),
    currentDate,
  };
};
