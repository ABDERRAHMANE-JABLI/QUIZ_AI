import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

function disableAutocomplete() {
  const inputs = document.getElementsByTagName('input');
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].setAttribute('autocomplete', 'off');
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

disableAutocomplete();
