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
      mirrorOpts: true,
      activeOpts: 'single'
    }
  },

  /**
   * Switch between single and double-column opts.
   * @param  {String} size Ie, 'single' or 'double'
   * @return {void}
   */
  switchOpts: function(size){
    switch(size){
      case 'single':
        this.setState({
          activeOpts: 'single'
        })
        break;
      case 'double':
        this.setState({
          mirrorOpts: false,
          activeOpts: 'double'
        });
        break;
    }
  },

  /**
   * Determine whether size selector is active.
   * @param  {String} size Ie, 'single' or 'double'
   * @return {String}   Class names
   */
  activeClass: function(size){
    return size == this.state.activeOpts ? 'active' : null;
  },

  /**
   * Determine if opts are disabled, ie, not shown.
   * @param  {String} size Ie, 'single' or 'double'
   * @return {String}   Class names
   */
  disabledClass: function(size){
    var active = this.state.activeOpts;
    var mirror = this.state.mirrorOpts;

    switch(size){
      case 'single':
        return active === 'single' ?
          'form-group' : 'disabled form-group';
      case 'double':
        return mirror ?
          'disabled form-group' :
            (
              active === 'double' ?
                'form-group' : 'disabled form-group'
            );
    }
  },

  /**
   * Change single column date format
   * @param  {Object} e Selected value
   * @return {void}
   */
  changeSingleFormat: function(e){
    var actions = this.props.actions;
    if(this.state.mirrorOpts){
      actions.setBaseSingleDateString(e.value);
      actions.setBaseDoubleDateString(e.value);
    }else{
      actions.setBaseSingleDateString(e.value);
    }
  },

  /**
   * Change single column frequency
   * @param  {Object} e Change event
   * @return {void}
   */
  changeSingleFrequency: function(e){
    var actions = this.props.actions,
        value = parseInt(e.target.value);
    if(this.state.mirrorOpts){
      actions.setBaseSingleFrequency(value);
      actions.setBaseDoubleFrequency(value);
    }else{
      actions.setBaseSingleFrequency(value);
    }
  },

  /**
   * Change double column date format
   * @param  {Object} e Selected value
   * @return {void}
   */
  changeDoubleFormat: function(e){
    var actions = this.props.actions;
    actions.setBaseDoubleDateString(e.value);
  },

  /**
   * Change double column frequency
   * @param  {Object} e Change event
   * @return {void}
   */
  changeDoubleFrequency: function(e){
    var actions = this.props.actions,
        value = parseInt(e.target.value);
    actions.setBaseDoubleFrequency(value);
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
      <div className="inline-exclusive-format clearfix">
        <small>Select the format type and frequency of dates on the axis. Formats for
          the single-column chart are used for the double-column chart by default.
          Click the double-column options to set those formats independently.
        </small>
        <div className="form-group size-switch">
          <label>Size</label>
          <img
            onClick={this.switchOpts.bind(this,'single')}
            src="img/icons/singleColumn.png"
            title="Single column"
            className={this.activeClass('single')}
          />
          <img
            onClick={this.switchOpts.bind(this,'double')}
            src="img/icons/doubleColumn.png"
            title="Double column"
            className={this.activeClass('double')}
          />
        </div>
        <div className={this.disabledClass('single')}>
          <label for="dateTickFormat-single">Format</label>
          <Select
              name="dateTickFormat-single"
              options={dateOptions}
              value={this.props.werk.axes.base.format.single.dateString}
              searchable={false}
              placeholder="Tick format"
              clearable={false}
              onChange={this.changeSingleFormat}
          />
        </div>
        <div className={this.disabledClass('single')}>
            <label for="dateTickFrequency-single">Frequency</label>
            <input
              name="dateTickFrequency-single"
              type="number"
              min="1"
              max="16"
              step="1"
              value={this.props.werk.axes.base.format.single.frequency}
              defaultValue="1"
              className="form-control"
              onChange={this.changeSingleFrequency}
            />
        </div>
        <div className={this.disabledClass('double')}>
          <label for="dateTickFormat-double">Format</label>
          <Select
              name="dateTickFormat-double"
              options={dateOptions}
              value={this.props.werk.axes.base.format.double.dateString}
              searchable={false}
              placeholder="Tick format"
              clearable={false}
              disabled={this.state.disableOpts}
              onChange={this.changeDoubleFormat}
          />
        </div>
        <div className={this.disabledClass('double')}>
            <label for="dateTickFrequency-double">Frequency</label>
            <input
              name="dateTickFrequency-double"
              type="number"
              min="1"
              max="16"
              step="1"
              value={this.props.werk.axes.base.format.double.frequency}
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
