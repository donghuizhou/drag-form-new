import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import './index.css';
import MainPage from './components/MainPage/MainPage'
import registerServiceWorker from './registerServiceWorker';
import 'antd/dist/antd.css';

ReactDOM.render(
  <Provider store={store}>
    <MainPage />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
// 目标岗位职责
// 目标岗位能力：管理能力，业务能力，技术能力，通用能力
// 试用期收获、感想
// 试用期自身不足，改进意见
// 1 2 3 年职业规划

// 转正述职报告

