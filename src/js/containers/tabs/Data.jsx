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
            <i className="fa fa-clipboard" aria-hidden="true"></i> Paste <b>clean</b> data
        </h4>

        <img src="img/icons/disallowed.png" />
        <small>
          No commas, currency symbols, percent signs or
          other textual notations on numbers. Your data <b>must</b> have a header row.
        </small>


        <DataInput {...this.props} />
      </div>
    );
  },

});
