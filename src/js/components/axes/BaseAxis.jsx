"use strict";
var React           = require('react');
var _               = require('lodash');
var Select          = require('react-select');
var DateFormat      = require('./DateFormat.jsx');

module.exports = React.createClass({

    propTypes: {
        actions: React.PropTypes.object,
        werk: React.PropTypes.object
    },

    render: function(){
      if(!this.props.werk.datamap.base){
        return (
          <div>
            <h4>Waiting for data</h4>
          <hr />
          </div>
        );
      }

      var baseAxis = null;


      switch(this.props.werk.axes.base.type){

        case 'categorical':
          break;

        case 'date':
          baseAxis = (
            <DateFormat
              werk={this.props.werk}
              actions={this.props.actions}
            />
          )
        case 'numerical':
          break;
      }


      return (
        <div>
          <h4>Base axis: <span className="basename">{this.props.werk.datamap.base}</span></h4>
          {baseAxis}
        <hr />
        </div>

      );
    }
});
