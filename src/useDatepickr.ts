import { useState } from 'react';
import toDate from 'date-fns/toDate';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import isWithinInterval from 'date-fns/isWithinInterval';
import isSameDay from 'date-fns/isSameDay';
import format from 'date-fns/format';
import addDays from 'date-fns/addDays';
import subDays from 'date-fns/subDays';
import getMonth from 'date-fns/getMonth';
import getYear from 'date-fns/getYear';
import { DateRange, PickrBag, PickrConfig, PickrDate } from './types';
import { calcRange, calcRangeOverflow, formatDateNumber, inRange } from './utils';
import { DAY_OF_WEEK_LABELS, MONTH_LABELS } from './constants';

export const useDatepickr = ({
  initialDate = new Date(),
  initialRange,
  rangeOverflow = 'blanks',
  padDates = false,
  dateDisplayFormat = 'yyyy-MM-dd',
  dayOfWeekLabels = DAY_OF_WEEK_LABELS,
  monthLabels = MONTH_LABELS,
  disabled = () => false,
}: PickrConfig = {}): PickrBag => {
  const [currentDate, setCurrentDate] = useState(toDate(initialDate));
  const [currentRange, setCurrentRange] = useState<DateRange>(
    initialRange
      ? { start: toDate(initialRange.start), end: toDate(initialRange.end) }
      : calcRange(toDate(initialDate))
  );

  const onDateSelected = (date: Date) => {
    console.log(date);
    setCurrentDate(date);
  };

  const onSelectNextRange = () => {
    const nextRangeDate = addDays(currentRange.end, 1);
    setCurrentRange(calcRange(nextRangeDate));
  };

  const onSelectPrevRange = () => {
    const prevRangeDate = subDays(currentRange.start, 1);
    setCurrentRange(calcRange(prevRangeDate));
  };

  const getPickrDates = (): PickrDate[] => {
    const { start, end } =
      rangeOverflow === 'none' ? currentRange : calcRangeOverflow(currentRange);
    const interval = eachDayOfInterval({ start, end });
    return interval.map((date, i) => {
      const inCurrentRange = isWithinInterval(date, currentRange);
      const isSelected = isSameDay(date, currentDate);
      const label =
        inCurrentRange || rangeOverflow === 'dates' ? formatDateNumber(date, padDates) : '';
      return {
        date,
        key: i,
        label,
        onSelect:
          inCurrentRange || rangeOverflow === 'dates' ? () => onDateSelected(date) : () => null,
        inCurrentRange,
        isSelected,
        disabled: inRange(date, disabled({ inCurrentRange, isSelected, date })),
      };
    });
  };

  return {
    dates: getPickrDates(),
    currentDate,
    displayDate: format(currentDate, dateDisplayFormat),
    onSelectNextRange,
    onSelectPrevRange,
    dayOfWeekLabels: Object.values(dayOfWeekLabels),
    currentMonthLabel: monthLabels[getMonth(currentRange.start)],
    currentYearLabel: getYear(currentRange.start).toString(),
  };
};
