import { useDatepickr } from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const test = useDatepickr();
    expect(test).toBe(true);
  });
});
