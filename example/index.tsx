import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useDatepickr } from '../.';

const App = () => {
  const test = useDatepickr();
  return <div>{test ? "it's true" : "it's false"}</div>;
};

ReactDOM.render(<App />, document.getElementById('root'));
