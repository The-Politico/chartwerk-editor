"use strict";
var ReactDOM = require('react-dom');
var App = require('./containers/App.jsx');
var React = require('react');
var Provider=require('react-redux').Provider;
var store = require('./stores/');

var ChartWerk = React.createClass({
  render: function(){
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
});

ReactDOM.render(
  <ChartWerk />,
  document.getElementById('chartwerk-app')
);
