import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css/normalize.css';
import './styles/global.scss';
import App from './App';
import FormContextProvider from './context/form-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FormContextProvider>
      <App />
    </FormContextProvider>
  </React.StrictMode>
);