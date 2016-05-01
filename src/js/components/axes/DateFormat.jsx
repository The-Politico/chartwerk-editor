"use strict";
var React           = require('react');
var Select          = require('react-select');
var _               = require('lodash');
var moment          = require('moment');
// Add additional datetimes to constants/datetime.
var datetime        = require('../../constants/datetime');
var $               = require('jquery');

module.exports = React.createClass({

  propTypes: {
      actions: React.PropTypes.object,
      werk: React.PropTypes.object
  },

  getInitialState: function(){
    return {
      disableOpts: true,
      singleFormat: null,
      singleFrequency: 1,
      doubleFormat: null,
      doubleFrequency: 1
    }
  },

  enableInputs: function(){
    if(this.state.disableOpts){
      this.setState({disableOpts: false});
    }
  },

  disabledClass: function(){
    return this.state.disableOpts ? 'disabled form-group' : 'form-group';
  },

  changeSingleFormat: function(e){
    if(this.state.disableOpts){
      this.setState({
        singleFormat: e.value,
        doubleFormat: e.value
      });
    }else{
      this.setState({ singleFormat: e.value });
    }
  },

  changeSingleFrequency: function(e){
    console.log(e);
    if(this.state.disableOpts){
      this.setState({
        singleFrequency: e.target.value,
        doubleFrequency: e.target.value
      });
    }else{
      this.setState({ singleFrequency: e.target.value });
    }
  },

  changeDoubleFormat: function(e){
    this.setState({doubleFormat:e.value});
  },

  changeDoubleFrequency: function(e){
    this.setState({doubleFrequency:e.value});
  },

  render: function(){
    var dateOptions = [
      { value: 'Y', label: 'Year'         },
      { value: 'y', label: 'Short year'   },
      { value: 'M', label: 'Month'        },
      { value: 'm', label: 'Short month'  },
      { value: 'W', label: 'Week'         },
      { value: 'w', label: 'Short week'   },
      { value: 'D', label: 'Date'         },
    ]

    return (
      <div className="date-format clearfix">
        <h5>Date format</h5>
        <div className="form-group">
          <label for="dateTickFormat-double">Single column</label>
          <Select
              name="dateTickFormat-double"
              options={dateOptions}
              value={this.state.singleFormat}
              searchable={false}
              placeholder="Tick format"
              clearable={false}
              onChange={this.changeSingleFormat}
          />
        </div>
        <div className="form-group">
            <input
              name="dateTickFrequency-double"
              type="number"
              min="1"
              max="16"
              step="1"
              value={this.state.singleFrequency}
              defaultValue="1"
              className="form-control"
              onChange={this.changeSingleFrequency}
            />
        </div>
        <div className={this.disabledClass()} onClick={this.enableInputs}>
          <label for="dateTickFormat-single">Double column</label>
          <Select
              name="dateTickFormat-single"
              options={dateOptions}
              value={this.state.doubleFormat}
              searchable={false}
              placeholder="Tick format"
              clearable={false}
              disabled={this.state.disableOpts}
              onChange={this.changeDoubleFormat}
          />
        </div>
        <div className={this.disabledClass()} onClick={this.enableInputs}>
            <input
              name="dateTickFrequency-single"
              type="number"
              min="1"
              max="16"
              step="1"
              value={this.state.doubleFrequency}
              defaultValue="1"
              className="form-control"
              disabled={this.state.disableOpts}
              onChange={this.changeDoubleFrequency}
            />
        </div>

      </div>
    );

  }


});
