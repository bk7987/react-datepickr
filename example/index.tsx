import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useDatepickr } from 'react-datepickr';

const App = () => {
  const { dates, currentDate } = useDatepickr({ dateDisplay: 'padded', rangeOverflow: 'dates' });
  return (
    <div>
      <input
        type="text"
        readOnly
        style={{ padding: '0.5rem', border: '1px solid gray', borderRadius: '0.25rem' }}
      />
      <div>
        {dates.map(({ key, label, onClick }) => (
          <div
            onClick={onClick}
            key={key}
            style={{
              display: 'inline-block',
              padding: '0.5rem',
              margin: '0.5rem',
              backgroundColor: 'gainsboro',
            }}
          >
            {label}
          </div>
        ))}
      </div>
      <div>{currentDate.toString()}</div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
