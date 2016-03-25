'use strict';
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import jss from 'jss';
import jssVendorPrefixer from 'jss-vendor-prefixer';
import jssPx from 'jss-px';
import jssNested from 'jss-nested';
import jssCamelCase from 'jss-camel-case';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import promise from 'redux-promise';

import Index from './pages/Index';
import LoginPage from './pages/LoginPage';
import reducers from './reducers';

// needed for some material-ui components; will not be needed in react v1.0
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

jss.use(jssVendorPrefixer());
jss.use(jssPx());
jss.use(jssNested());
jss.use(jssCamelCase());

const createStoreWithMiddleware = applyMiddleware(
  thunk,
  promise,
  createLogger()
)(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Index}/>
      <Route path="/lol" component={Index}/>
      <Route path="/login" component={LoginPage}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);

