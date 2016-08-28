import React from 'react';
import Select from 'react-select';

export default React.createClass({

  propTypes: {
    actions: React.PropTypes.object,
    werk: React.PropTypes.object,
  },

  getInitialState() {
    return {
      mirrorOpts: true,
      activeOpts: 'single',
    };
  },

  /**
   * Switch between single and double-column opts.
   * @param  {String} size Ie, 'single' or 'double'
   * @return {void}
   */
  switchOpts(size) {
    switch (size) {
      case 'single':
        this.setState({
          activeOpts: 'single',
        });
        break;
      case 'double':
        this.setState({
          mirrorOpts: false,
          activeOpts: 'double',
        });
        break;
      default:
        break;
    }
  },

  /**
   * Determine whether size selector is active.
   * @param  {String} size Ie, 'single' or 'double'
   * @return {String}   Class names
   */
  activeClass(size) {
    return size === this.state.activeOpts ? 'active' : null;
  },

  /**
   * Determine if opts are disabled, ie, not shown.
   * @param  {String} size Ie, 'single' or 'double'
   * @return {String}   Class names
   */
  disabledClass(size) {
    const active = this.state.activeOpts;
    const mirror = this.state.mirrorOpts;

    switch (size) {
      case 'single':
        return active === 'single' ?
          'form-group' : 'disabled form-group';
      case 'double':
        if (mirror) return 'disabled form-group';
        if (active === 'double') return 'form-group';
        return 'disabled form-group';
      default:
        return 'disabled form-group';
    }
  },

  /**
   * Change single column date format
   * @param  {Object} e Selected value
   * @return {void}
   */
  changeSingleFormat(e) {
    const actions = this.props.actions;
    if (this.state.mirrorOpts) {
      actions.setBaseSingleDateString(e.value);
      actions.setBaseDoubleDateString(e.value);
    } else {
      actions.setBaseSingleDateString(e.value);
    }
  },

  /**
   * Change single column frequency
   * @param  {Object} e Change event
   * @return {void}
   */
  changeSingleFrequency(e) {
    const actions = this.props.actions;
    const value = parseInt(e.target.value, 10);
    if (this.state.mirrorOpts) {
      actions.setBaseSingleFrequency(value);
      actions.setBaseDoubleFrequency(value);
    } else {
      actions.setBaseSingleFrequency(value);
    }
  },

  /**
   * Change double column date format
   * @param  {Object} e Selected value
   * @return {void}
   */
  changeDoubleFormat(e) {
    const actions = this.props.actions;
    actions.setBaseDoubleDateString(e.value);
  },

  /**
   * Change double column frequency
   * @param  {Object} e Change event
   * @return {void}
   */
  changeDoubleFrequency(e) {
    const actions = this.props.actions;
    const value = parseInt(e.target.value, 10);
    actions.setBaseDoubleFrequency(value);
  },

  render() {
    const dateOptions = [
      { value: 'Y', label: 'Year' },
      { value: 'y', label: 'Short year' },
      { value: 'M', label: 'Month' },
      { value: 'm', label: 'Short month' },
      { value: 'W', label: 'Week' },
      { value: 'w', label: 'Short week' },
      { value: 'D', label: 'Date' },
    ];

    return (
      <div className="inline-exclusive-format clearfix">
        <small>Select the format type and frequency of dates on the axis. Formats for
          the single-column chart are used for the double-column chart by default.
          Click the double-column options to set those formats independently.
        </small>
        <div className="form-group size-switch">
          <label>Size</label>
          <img
            onClick={this.switchOpts.bind(this,'single')} // eslint-disable-line
            src={`${window.chartwerkConfig.staticPrefix}img/icons/singleColumn.png`}
            title="Single-wide"
            className={this.activeClass('single')}
            alt="Single-wide"
          />
          <img
            onClick={this.switchOpts.bind(this,'double')} // eslint-disable-line
            src={`${window.chartwerkConfig.staticPrefix}img/icons/doubleColumn.png`}
            title="Double-wide"
            className={this.activeClass('double')}
            alt="Double-wide"
          />
        </div>
        <div className={this.disabledClass('single')}>
          <label htmlFor="dateTickFormat-single">Format</label>
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
          <label htmlFor="dateTickFrequency-single">Frequency</label>
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
          <label htmlFor="dateTickFormat-double">Format</label>
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
          <label htmlFor="dateTickFrequency-double">Frequency</label>
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
  },

});
