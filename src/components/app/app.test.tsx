
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

it('render React', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});