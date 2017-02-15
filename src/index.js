import React from 'react';
import ReactDOM from 'react-dom';

//assets
import './assets/sass/app.scss';
import jquery from 'jquery';

//html
require('file?name=[name].[ext]!../index.html');

import App from './src/components/App';

//redux
import configureStore from './store';
import {Provider} from 'react-redux';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>, document.querySelector('#app-container'));
