import { renderHook, act } from '@testing-library/react-hooks';
import isSameDay from 'date-fns/isSameDay';
import { DateFormat, PickrConfig, useDatepickr } from '../src';

const testHook = (config?: PickrConfig) => renderHook(() => useDatepickr(config));
const testDate = new Date(2020, 8, 16);

it('can call useDatepickr with no arguments', () => {
  const { result } = testHook();
  expect(result.current).toBeDefined();
});

it('defaults the current date to today', () => {
  const { result } = testHook();
  expect(isSameDay(result.current.currentDate, new Date())).toBe(true);
});

it('provides correct overflow dates', () => {
  const { result } = testHook({ rangeOverflow: 'dates', initialDate: testDate });
  const firstDate = result.current.dates[0].date;
  const lastDate = result.current.dates[result.current.dates.length - 1].date;
  expect(isSameDay(firstDate, new Date(2020, 7, 30))).toBe(true);
  expect(isSameDay(lastDate, new Date(2020, 9, 3))).toBe(true);
});

it('does not select a date when date is out of range', () => {
  const { result } = testHook({ initialDate: testDate });
  act(() => {
    result.current.dates[0].onSelect();
  });
  expect(isSameDay(result.current.currentDate, testDate)).toBe(true);
});

it('selects a date when onSelect is called', () => {
  const { result } = testHook({ initialDate: testDate });
  act(() => {
    result.current.dates[2].onSelect();
  });
  expect(isSameDay(result.current.currentDate, new Date(2020, 8, 1)));
});

it('can switch to next date range', () => {
  const { result } = testHook({ initialDate: testDate });
  act(() => {
    result.current.onSelectNextRange();
  });
  const startDate = result.current.currentRange.start;
  expect(isSameDay(startDate, new Date(2020, 9, 1))).toBe(true);
});

it('can switch to previous date range', () => {
  const { result } = testHook({ initialDate: testDate });
  act(() => {
    result.current.onSelectPrevRange();
  });
  const endDate = result.current.currentRange.end;
  expect(isSameDay(endDate, new Date(2020, 7, 31)));
});

it('adjusts the range based on initial range', () => {
  const range = { start: new Date(2020, 7, 5), end: new Date(2020, 7, 10) };
  const { result } = testHook({
    initialDate: testDate,
    initialRange: range,
  });
  expect(result.current.currentRange).toStrictEqual(range);
});

it('pads dates correctly', () => {
  const { result } = testHook({ initialDate: testDate, padDates: true });
  expect(result.current.dates[2].label).toBe('01');

  const { result: res } = testHook({ initialDate: testDate, padDates: false });
  expect(res.current.dates[2].label).toBe('1');
});

it('properly formats display dates', () => {
  const formats: DateFormat[] = ['yyyy-MM-dd', 'yy-MM-dd', 'MM/dd/yyyy', 'MM/dd/yy'];
  const formatted = ['2020-09-04', '20-09-04', '09/04/2020', '09/04/20'];
  formats.forEach((fmt, i) => {
    const { result } = testHook({ initialDate: new Date(2020, 8, 4), dateDisplayFormat: fmt });
    expect(result.current.displayDate).toBe(formatted[i]);
  });
});

it('allows use of custom weekday labels', () => {
  const { result } = testHook({
    dayOfWeekLabels: { 0: 'SUN', 1: 'MON', 2: 'TUE', 3: 'WED', 4: 'THU', 5: 'FRI', 6: 'SAT' },
  });
  expect(result.current.dayOfWeekLabels).toStrictEqual([
    'SUN',
    'MON',
    'TUE',
    'WED',
    'THU',
    'FRI',
    'SAT',
  ]);
});

it('allows use of custom month labels', () => {
  const { result } = testHook({
    monthLabels: {
      0: '0',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
    },
  });
  expect(result.current.monthLabels).toStrictEqual([
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
  ]);
});

it('disables dates when passed a range object', () => {
  const { result } = testHook({
    initialDate: testDate,
    disabled: () => {
      return { start: new Date(2020, 8, 2), end: new Date(2020, 8, 3) };
    },
  });

  expect(result.current.dates[2].disabled).toBe(false);
  expect(result.current.dates[3].disabled).toBe(true);
  expect(result.current.dates[4].disabled).toBe(true);
  expect(result.current.dates[5].disabled).toBe(false);
});

it('disables dates when passed multiple range objects', () => {
  const { result } = testHook({
    initialDate: testDate,
    disabled: () => {
      return [
        { start: new Date(2020, 8, 1), end: new Date(2020, 8, 1) },
        { start: new Date(2020, 8, 3) },
      ];
    },
  });

  expect(result.current.dates[1].disabled).toBe(false);
  expect(result.current.dates[2].disabled).toBe(true);
  expect(result.current.dates[3].disabled).toBe(false);
  expect(result.current.dates[4].disabled).toBe(true);
});

it('disables dates when passed a boolean', () => {
  const { result } = testHook({
    initialDate: testDate,
    disabled: ({ date }) => isSameDay(date, new Date(2020, 8, 1)),
  });
  expect(result.current.dates[1].disabled).toBe(false);
  expect(result.current.dates[2].disabled).toBe(true);
  expect(result.current.dates[3].disabled).toBe(false);
});

it('can deal with overlapping disabled ranges', () => {
  const { result } = testHook({
    initialDate: testDate,
    disabled: () => [{ end: new Date(2020, 8, 5) }, { start: new Date(2020, 8, 4) }],
  });
  expect(result.current.dates[1].disabled).toBe(true);
  expect(result.current.dates[4].disabled).toBe(true);
});

it('only returns dates in current range when overflow is none', () => {
  const { result } = testHook({
    initialDate: testDate,
    rangeOverflow: 'none',
  });
  expect(isSameDay(result.current.dates[0].date, new Date(2020, 8, 1))).toBe(true);
  expect(
    isSameDay(result.current.dates[result.current.dates.length - 1].date, new Date(2020, 8, 30))
  ).toBe(true);
});
