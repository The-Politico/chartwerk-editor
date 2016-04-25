"use strict";
var React = require('react');
var Provider=require('react-redux').Provider;
var store = require('../stores/');

var Tabs = require('./tabs/index.jsx');

var App = React.createClass({
  render: function() {
    return (
      <Provider store={store}>
        <Tabs />
      </Provider>
    );
  }
});

module.exports = App;
