"use strict";
var React           = require('react');
var $               = require('jquery');

var NumericFormat   = require('./NumericFormat.jsx');

module.exports = React.createClass({

    propTypes: {
        actions: React.PropTypes.object,
        werk: React.PropTypes.object
    },

    changeTab: function(e){
      e.preventDefault();
      $('a[href="#layout"]').tab('show');
    },

    render: function(){
      if(this.props.werk.datamap.series < 1){
        return (
          <div>
            <h4>Waiting for a data series from the Data tab.</h4>
          </div>
        );
      }

      return (
        <div>
          <h4>Value axis</h4>
          <NumericFormat
            werk={this.props.werk}
            actions={this.props.actions}
            type="value"
          />

          <div className="guidepost">
            <h4>
              <a onClick={this.changeTab} href="">
                <b>Next:</b> Layout
                <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
              </a>
            </h4>
          </div>

        </div>
      );
    }
});
