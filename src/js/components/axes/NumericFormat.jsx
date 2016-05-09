"use strict";
var React           = require('react');
var Select          = require('react-select');
var _               = require('lodash');
var $               = require('jquery');

module.exports = React.createClass({

  propTypes: {
      actions: React.PropTypes.object,
      werk: React.PropTypes.object,
      type: React.PropTypes.string
  },

  getInitialState: function(){
    return {
      mirrorOpts: true,
      activeOpts: 'single',
      // We keep custom ticks as text values for the input in state, but parse
      // them as an array of numbers to send to state tree.
      singleCustomValue: null,
      doubleCustomValue: null
    }
  },

  /**
   * Enable independent double-column options.
   * @return {void}
   */
  enableOpts: function(){
    if(this.state.mirrorOpts){
      this.setState({mirrorOpts: false});
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
   * Determine whether size selector is active.
   * @param  {String} size Ie, 'single' or 'double'
   * @return {String}   Class names
   */
  activeClass: function(size){
    return size == this.state.activeOpts ? 'active' : null;
  },

  /**
   * Disable ticks input if custom ticks given.
   * @param  {String} size Ie, 'single' or 'double'
   * @return {String}      Class names
   */
  disableInput: function(size){
    var werk = this.props.werk;
    switch(size){
      case 'single':
        return this.state.singleCustomValue ?
          'disabled form-control' : 'form-control';
      case 'double':
        return this.state.doubleCustomValue ?
          'disabled form-control' : 'form-control';
    }
  },

  /**
   * Parse comma-separated ticks.
   * @param  {String} tickString String of comma-separated values from input.
   * @return {Array}            Parsed numeric values.
   */
  parseCustomTicks: function(tickString){
    var ticks = _.map(tickString.split(','), function(d){
      return parseFloat(d);
    });

    return _.filter(ticks, function(d){
      return !isNaN(d);
    });
  },

  /**
   * Get tick numbers value from either base or value axis.
   * @param  {String} size Ie, 'single' or 'double'
   * @return {Integer} Number of ticks
   */
  getTicks: function(size){
    var werk = this.props.werk;
    switch(size){
      case 'single':
        return this.props.type === 'base' ?
          werk.axes.base.format.single.ticks :
          werk.axes.value.format.single.ticks;
      case 'double':
        return this.props.type === 'base' ?
          werk.axes.base.format.double.ticks :
          werk.axes.value.format.double.ticks;
    }
  },

  /**
   * Set single tick number for either base or value axis.
   * @param  {Object} e change event
   * @return {void}
   */
  setSingleTicks: function(e){
    var actions = this.props.actions,
        value = parseFloat(e.target.value);
    switch(this.props.type){
      case 'base':
        if(this.state.mirrorOpts){
          actions.setBaseSingleTicks(value);
          actions.setBaseDoubleTicks(value);
        }else{
          actions.setBaseSingleTicks(value);
        }
        break;
      case 'value':
        if(this.state.mirrorOpts){
          actions.setValueSingleTicks(value);
          actions.setValueDoubleTicks(value);
        }else{
          actions.setValueSingleTicks(value);
        }
        break;
    }
  },

  /**
   * Set double tick number for either base or value axis.
   * @param  {Object} e change event
   * @return {void}
   */
  setDoubleTicks: function(e){
    var actions = this.props.actions,
        value = pareFloat(e.target.value);
    if(this.props.type === 'base'){
      actions.setBaseDoubleTicks(value);
    }else{
      actions.setValueDoubleTicks(value);
    }
  },

  /**
   * Set single custom ticks for either base or value axis.
   * @param  {Object} e Change event
   * @return {void}
   */
  setSingleCustom: function(e){
    var actions = this.props.actions,
        ticks = this.parseCustomTicks(e.target.value);
    switch(this.props.type){
      case 'base':
        if(this.state.mirrorOpts){
          actions.setBaseSingleCustomTicks(ticks);
          actions.setBaseDoubleCustomTicks(ticks);
        }else{
          actions.setBaseSingleCustomTicks(ticks);
        }
        break;
      case 'value':
        if(this.state.mirrorOpts){
          actions.setValueSingleCustomTicks(ticks);
          actions.setValueDoubleCustomTicks(ticks);
        }else{
          actions.setValueSingleCustomTicks(ticks);
        }
        break;
    }
    this.setState({
      singleCustomValue: e.target.value
    });
  },

  /**
   * Change double custom ticks for either base or value axis.
   * @param  {Object} e Change event
   * @return {void}
   */
  setDoubleCustom: function(e){
    var actions = this.props.actions,
        ticks = this.parseCustomTicks(e.target.value);
    if(this.props.type === 'base'){
      actions.setBaseDoubleCustomTicks(ticks);
    }else{
      actions.setValueDoubleCustomTicks(ticks);
    }
    this.setState({
      doubleCustomValue: e.target.value
    });
  },

  /**
   * Get either base or value axis min or max.
   * @param  {String} m Either min or max
   * @return {Number}   Min or max value
   */
  getMinMax: function(m){
    var werk = this.props.werk;
    switch(this.props.type){
      case 'base':
        return m === 'min' ?
          werk.axes.base.min : werk.axes.base.max;
      case 'value':
        return m === 'min' ?
          werk.axes.value.min : werk.axes.value.max;
    }
  },

  /**
   * Set either base or value axis min or max.
   * @param  {String} m Either min or max
   * @param  {Object} e Change event
   * @return {void}
   */
  setMinMax: function(m, e){
    var actions = this.props.actions,
        value = parseFloat(e.target.value);
    switch(this.props.type){
      case 'base':
        if(m === 'min'){
          actions.setBaseMin(value);
        }else{
          actions.setBaseMax(value);
        }
        break;
      case 'value':
        if(m === 'min'){
          actions.setValueMin(value);
        }else{
          actions.setValueMax(value);
        }
        break;
    }
  },

  /**
   * Set either base or value axis label.
   * @param  {Object} e Change event
   * @return {void}
   */
  setLabel: function(e){
    var actions = this.props.actions;
    switch(this.props.type){
      case 'base':
        actions.setBaseLabel(e.target.value);
        break;
      case 'value':
        actions.setValueLabel(e.target.value);
        break;
    }
  },

  /**
   * Get either base or value axis label.
   * @return {String} The label
   */
  getLabel: function(){
    var werk = this.props.werk;
    return this.props.type === 'base' ?
      werk.axes.base.label : werk.axes.value.label;
  },

  /**
   * Set either base or value axis prefix.
   * @param  {Object} e Change event
   * @return {void}
   */
  setPrefix: function(e){
    var actions = this.props.actions;
    switch(this.props.type){
      case 'base':
        actions.setBasePrefix(e.target.value);
        break;
      case 'value':
        actions.setValuePrefix(e.target.value);
        break;
    }
  },

  /**
   * Get either base or value axis prefix.
   * @return {String} The prefix
   */
  getPrefix: function(){
    var werk = this.props.werk;
    return this.props.type === 'base' ?
      werk.axes.base.prefix : werk.axes.value.prefix;
  },

  /**
   * Set either base or value axis suffix.
   * @param  {Object} e Change event
   * @return {void}
   */
  setSuffix: function(e){
    var actions = this.props.actions;
    switch(this.props.type){
      case 'base':
        actions.setBaseSuffix(e.target.value);
        break;
      case 'value':
        actions.setValueSuffix(e.target.value);
        break;
    }
  },

  /**
   * Get either base or value axis suffix.
   * @return {String} The suffix
   */
  getSuffix: function(){
    var werk = this.props.werk;
    return this.props.type === 'base' ?
      werk.axes.base.suffix : werk.axes.value.suffix;
  },

  render: function(){
    return (
      <div className="inline-exclusive-format clearfix numeric">
        <small>Pick how many ticks you would like on the axis. You can also set custom ticks by entering them into the text box, separated by commas. Tick options for the single-column chart are used for the double-column chart by default. Click the double-column size button to set ticks independently.</small>
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
        <div className={this.disabledClass('single')} >
            <label for="numTicks-single">Number</label>
            <input
              name="numTicks-single"
              type="number"
              min="4"
              max="10"
              step="1"
              value={this.getTicks('single')}
              className={this.disableInput('single')}
              onChange={this.setSingleTicks}
            />
        </div>
        <div className={this.disabledClass('single')} >
          <label for="customTicks-single">Custom ticks</label>
          <input
            name="customTicks-single"
            type="text"
            placeholder="Comma-separated"
            value=""
            className="form-control"
            value={this.state.singleCustomValue}
            onChange={this.setSingleCustom}
          />
        </div>
        <div className={this.disabledClass('double')}>
          <label for="numTicks-double">Number</label>
          <input
            name="numTicks-double"
            type="number"
            min="4"
            max="10"
            step="1"
            value={this.getTicks('double')}
            className={this.disableInput('double')}
            onChange={this.setDoubleTicks}
          />
        </div>
        <div className={this.disabledClass('double')}>
          <label for="customTicks-double">Custom ticks</label>
          <input
            name="customTicks-double"
            type="text"
            placeholder="Comma-separated"
            value=""
            className="form-control"
            value={this.state.doubleCustomValue}
            onChange={this.setDoubleCustom}
          />
        </div>
        <br />
        <small>Optionally, choose min and max values for the axis. In many cases, the min should be 0. <b>In all cases</b>, the min should be below your lowest data value and the max, above the highest.</small>
        <div className="form-group">
          <label for="axis-min">Min</label>
          <input
            name="axis-min"
            type="number"
            className="form-control minmax"
            value={this.getMinMax('min')}
            onChange={this.setMinMax.bind(this,'min')}
          />
        </div>
        <div className="form-group">
          <label for="axis-max">Max</label>
          <input
            name="axis-max"
            type="number"
            className="form-control minmax"
            value={this.getMinMax('max')}
            onChange={this.setMinMax.bind(this,'max')}
          />
        </div>
        <br />
        <small>Add any needed annotations to the axis. The label is placed above the axis, while the prefix and suffix are placed before and after each tick on the axis, for example, currency symbols.</small>
        <div className="form-group">
          <label for="axis-label">Label</label>
          <input
            name="axis-label"
            type="text"
            className="form-control"
            value={this.getLabel()}
            onChange={this.setLabel}
          />
        </div>
        <div className="form-group">
          <label for="axis-prefix">Prefix</label>
          <input
            name="axis-prefix"
            type="text"
            className="form-control presuffix"
            value={this.getPrefix()}
            onChange={this.setPrefix}
          />
        </div>
        <div className="form-group">
          <label for="axis-suffix">Suffix</label>
          <input
            name="axis-suffix"
            type="text"
            className="form-control presuffix"
            value={this.getSuffix()}
            onChange={this.setSuffix}
          />
        </div>
      </div>
    )
  }

});
