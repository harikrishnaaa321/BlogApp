import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { createRoot } from 'react-dom/client'; 

import ThemeProvider from './components/ThemeProvider';

createRoot(document.getElementById('root')).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <ThemeProvider><App /></ThemeProvider>
     
    </Provider>
  </PersistGate>
);
