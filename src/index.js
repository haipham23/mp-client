import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import registerServiceWorker from './registerServiceWorker';
import configure, { history } from './store/configure';

import Router from './components/Router/Router';

import './css/index.css';

const store = configure();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Router />
    </ConnectedRouter>
  </Provider>, document.getElementById('root')
);

registerServiceWorker();
