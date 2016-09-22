import ReactDOM from 'react-dom';
import App from './containers/App';
import React from 'react';
import { Provider } from 'react-redux';
import store from './stores/';

const Chartwerk = () =>
  <Provider store={store}>
    <App />
  </Provider>;

ReactDOM.render(
  <Chartwerk />,
  document.getElementById('chartwerk-app')
);
