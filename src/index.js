import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

import App from './app/App';
import * as serviceWorker from './serviceWorker';

import { ConfigProvider } from 'antd'
import esEs from 'antd/lib/locale-provider/es_ES'

import 'antd/dist/antd.css'
import './stylesheets/main.scss';

ReactDOM.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <ConfigProvider locale={esEs}>
      <App />
    </ConfigProvider>
  </BrowserRouter>,
  document.getElementById('ReactApp')
);

serviceWorker.unregister();
