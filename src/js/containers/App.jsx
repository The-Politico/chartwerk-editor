"use strict";
var React = require('react');
var bindActionCreators = require('redux').bindActionCreators;
var connect=require("react-redux").connect;
var Actions = require('./../actions/');

var Editor = require('./panes/Editor.jsx');
var Preview = require('./panes/Preview.jsx');

var App = React.createClass({
  render: function() {
    var dispatch=this.props.dispatch;
    var werk=this.props.werk;
    var actions = bindActionCreators(Actions, dispatch);

    return (
      <div>
        <Preview werk={werk} actions={actions} />
        <Editor werk={werk} actions={actions} />
      </div>
    );
  }
});


function mapStateToProps(state) {
  return {
    werk: state
  };
}


module.exports = connect(mapStateToProps)(App);
