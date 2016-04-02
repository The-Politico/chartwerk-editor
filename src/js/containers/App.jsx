"use strict";
var React = require('react');
var DataTab = require('./DataTab.jsx');
var Provider=require('react-redux').Provider;
var store = require('../stores/');

var App = React.createClass({
  render: function() {
    return (
      <Provider store={store}>
        <DataTab />
      </Provider>
    );
  }
});

module.exports = App;
