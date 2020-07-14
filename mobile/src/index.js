import React from 'react';
import App from './App';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import './config/ReacotronConfig';
import {store, persistor} from './store';

export default () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};
