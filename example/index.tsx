import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useDatepickr } from '../.';

const App = () => {
  const {
    dates,
    currentDate,
    displayDate,
    onSelectNextRange,
    onSelectPrevRange,
    dayOfWeekLabels,
    currentMonthLabel,
    currentYearLabel,
  } = useDatepickr({
    padDates: true,
    rangeOverflow: 'blanks',
  });
  return (
    <div>
      <input
        type="text"
        readOnly
        value={displayDate}
        style={{ padding: '0.5rem', border: '1px solid gray', borderRadius: '0.25rem' }}
      />
      <div style={{ margin: '1rem' }}>
        <button onClick={onSelectPrevRange}>Prev Month</button>
        <button onClick={onSelectNextRange}>Next Month</button>
      </div>
      <div>
        {currentMonthLabel} {currentYearLabel}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {dayOfWeekLabels.map((label, i) => (
          <div
            key={i}
            style={{
              width: '14.28%',
              textAlign: 'center',
              padding: '1rem 0',
              backgroundColor: 'lavender',
            }}
          >
            {label}
          </div>
        ))}
        {dates.map(({ key, label, onSelect, isSelected, disabled }) => (
          <div
            onClick={onSelect}
            key={key}
            style={{
              backgroundColor: isSelected ? 'lightpink' : 'lightgoldenrodyellow',
              cursor: disabled ? 'default' : 'pointer',
              width: '14.28%',
              textAlign: 'center',
              padding: '1rem 0',
            }}
          >
            <span style={{ color: disabled ? 'lightgray' : 'inherit' }}>{label}</span>
          </div>
        ))}
      </div>
      <div>{currentDate.toString()}</div>
      <div>{displayDate}</div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
