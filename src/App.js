import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
// let the store available to all application components

import '~/config/ReactotronConfig';

import Routes from '~/routes';
import history from '~/services/history';

import { store, persistor } from './store';
// needs to come after reactotron or it won't have access to sagaMonitor-enhancer

import GlobalStyle from '~/styles/global';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Routes />
          <GlobalStyle />
          <ToastContainer />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
