import { renderHook } from '@testing-library/react-hooks';
import isSameDay from 'date-fns/isSameDay';
import { PickrConfig, useDatepickr } from '../src';

const testHook = (config?: PickrConfig) => renderHook(() => useDatepickr(config));

it('can call useDatepickr with no arguments', () => {
  const { result } = testHook();
  expect(result.current).toBeDefined();
});

it('defaults the current date to today', () => {
  const { result } = testHook();
  expect(isSameDay(result.current.currentDate, new Date())).toBe(true);
});
