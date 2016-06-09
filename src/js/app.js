import ReactDOM from 'react-dom';
import App from './containers/App.jsx';
import React from 'react';
import { Provider } from 'react-redux';
import store from './stores/';

const ChartWerk = () =>
  <Provider store={store}>
    <App />
  </Provider>;

ReactDOM.render(
  <ChartWerk />,
  document.getElementById('chartwerk-app')
);
