import React from 'react';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import './App.css';
import Ways from './routes';
import history from './services/history';
import 'react-toastify/dist/ReactToastify.css';
import store, { persistor } from './store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Ways />
          <ToastContainer autoClose={2000} />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
