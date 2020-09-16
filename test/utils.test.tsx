import isSameDay from 'date-fns/isSameDay';
import { calcRangeOverflow, formatDateNumber } from '../src/utils';

it('correctly calculates range overflow', () => {
  const range = { start: new Date(2020, 8, 1), end: new Date(2020, 8, 30) };
  const { start, end } = calcRangeOverflow(range);
  expect(isSameDay(start, new Date(2020, 7, 30))).toBe(true);
  expect(isSameDay(end, new Date(2020, 9, 3))).toBe(true);
});

it('correctly formats a date number', () => {
  const testDate = new Date(2020, 8, 4);

  const noPadDefault = formatDateNumber(testDate);
  expect(noPadDefault).toBe('4');

  const noPad = formatDateNumber(testDate);
  expect(noPad).toBe('4');

  const padded = formatDateNumber(testDate, true);
  expect(padded).toBe('04');

  const twoCharLimit = formatDateNumber(new Date(2020, 8, 10), true);
  expect(twoCharLimit).toBe('10');
});
