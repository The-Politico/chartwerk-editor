"use strict";
var React = require('react');
// Components
var Inputs = require('./../../components/text/Inputs.jsx');


module.exports = React.createClass({

  propTypes: {
      actions: React.PropTypes.object,
      werk: React.PropTypes.object
  },

  render: function() {

    return (
      <div role="tabpanel" className="tab-pane" id="text">
        <Inputs werk={this.props.werk} actions={this.props.actions} />
      </div>
    );
  },

});
