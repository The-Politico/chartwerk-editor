"use strict";
var React = require('react');
// Components
var BaseAxis = require('../../components/axes/BaseAxis.jsx');


module.exports = React.createClass({

  propTypes: {
      actions: React.PropTypes.object,
      werk: React.PropTypes.object
  },

  render: function() {

    return (
      <div role="tabpanel" className="tab-pane" id="axes">
        <BaseAxis werk={this.props.werk} actions={this.props.actions} />
      </div>
    );
  },

});
