import React from 'react';
import ReactDOM from 'react-dom';

//assets
import './assets/sass/app.scss';
import jquery from 'jquery';

//html
require('file?name=[name].[ext]!../index.html');

import configureStore from './src/store';
import {Provider} from 'react-redux';

//routes
import routes from './routes';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    {routes}
  </Provider>, document.querySelector('#app-container'));
