import '../scss/layout.scss';

import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from 'App/App';

import store from 'App/store/index.js'
const GlobalStore = createContext(store);

ReactDOM.render((
  <GlobalStore.Provider>
    <App />
  </GlobalStore.Provider>  
), document.getElementById('root'));