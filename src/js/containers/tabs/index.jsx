"use strict";
var React = require('react');
var bindActionCreators = require('redux').bindActionCreators;
var connect=require("react-redux").connect;
var Actions = require('../../actions/');
// Components
var DataTab = require('./Data.jsx');
var AxesTab = require('./Axes.jsx');
var LayoutTab = require('./Layout.jsx');


var Tabs = React.createClass({
  render: function() {
    var dispatch=this.props.dispatch;
    var werk=this.props.werk;
    var actions = bindActionCreators(Actions, dispatch);

    return (
      <div className="tab-content">
        <DataTab werk={werk} actions={actions} />
        <AxesTab werk={werk} actions={actions} />
        <LayoutTab werk={werk} actions={actions} />
      </div>
    );
  },

});

function mapStateToProps(state) {
  return {
    werk: state
  };
}


module.exports = connect(mapStateToProps)(Tabs);
