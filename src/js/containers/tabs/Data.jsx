"use strict";
var React = require('react');
var DataInput = require('../../components/data/DataInput.jsx');

module.exports = React.createClass({

  propTypes: {
      actions: React.PropTypes.object,
      werk: React.PropTypes.object
  },

  render: function() {


    return (
      <div role="tabpanel" className="tab-pane active clearfix" id="data">
        <h4>
            Paste <b>clean</b> data
            <span className="glyphicon glyphicon-info-sign helper" data-toggle="modal" >
            </span>
        </h4>

        <label className="control-label subtext"><b>Remember:</b> No commas, currency symbols, percent signs or other textual notations on numbers.</label>

        <DataInput werk={this.props.werk} actions={this.props.actions} />
      </div>
    );
  },

});
