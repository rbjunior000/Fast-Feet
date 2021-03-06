import React from 'react';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';

import { Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import history from './services/history';
import './config/ReactotronConfig';

import GlobalStyle from './styles/global';

import Routes from './routes';
import { store, persistor } from './store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ToastContainer autoClose={3000} />
        <Router history={history}>
          <GlobalStyle />
          <Routes />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
