import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.less';
import App from './app/App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import enUS from 'antd/lib/locale/en_US';

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <Router>
      <ConfigProvider locale={enUS}>
        <App />
      </ConfigProvider>
    </Router>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById('root'),
);
