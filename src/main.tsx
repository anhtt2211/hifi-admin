import { ConfigProvider } from 'antd';
import 'antd/dist/antd.less';
import enUS from 'antd/lib/locale/en_US';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import App from './app/App';
import './index.css';
import './index.less';
import store from './redux/store';

ReactDOM.render(
  // <React.StrictMode>
  <ConfigProvider locale={enUS}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </ConfigProvider>,
  // </React.StrictMode>,
  document.getElementById('root'),
);
