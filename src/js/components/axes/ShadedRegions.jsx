import React from 'react';

export default React.createClass({
  propTypes: {
    actions: React.PropTypes.object,
    werk: React.PropTypes.object,
    axis: React.PropTypes.string,
  },

  addRegion() {
    if (this.props.axis === 'base') {
      this.props.actions.addBaseShadedRegion();
    } else {
      this.props.actions.addValueShadedRegion();
    }
  },

  removeRegion(i) {
    if (this.props.axis === 'base') {
      this.props.actions.removeBaseShadedRegion(i);
    } else {
      this.props.actions.removeValueShadedRegion(i);
    }
  },

  getRegionMin(i) {
    return this.props.axis === 'base' ?
      this.props.werk.axes.base.shadedRegions[i].min :
      this.props.werk.axes.value.shadedRegions[i].min;
  },

  getRegionMax(i) {
    return this.props.axis === 'base' ?
      this.props.werk.axes.base.shadedRegions[i].max :
      this.props.werk.axes.value.shadedRegions[i].max;
  },

  setRegionMin(e, i) {
    if (this.props.axis === 'base') {
      this.props.actions.setBaseShadedRegionMin(i, e.target.value);
    } else {
      this.props.actions.setValueShadedRegionMin(i, e.target.value);
    }
  },

  setRegionMax(e, i) {
    if (this.props.axis === 'base') {
      this.props.actions.setBaseShadedRegionMax(i, e.target.value);
    } else {
      this.props.actions.setValueShadedRegionMax(i, e.target.value);
    }
  },

  getType() {
    return this.props.axis === 'base' &&
      this.props.werk.axes.base.dateFormat ?
      'text' : 'number';
  },

  render() {
    const axis = this.props.axis;
    const werk = this.props.werk;

    const axisRegions = axis === 'base' ?
      werk.axes.base.shadedRegions : werk.axes.value.shadedRegions;
    const regions = axisRegions.map((region, i) =>
      (<div className="shaded-region-opts clearfix" key={i}>
        <div className="form-group">
          <label htmlFor={`shade-min-${axis}-${i}`}>From</label>
          <input
            name={`shade-min-${axis}-${i}`}
            type={this.getType()}
            className="form-control minmax"
            value={this.getRegionMin(i)}
            onChange={(e) => this.setRegionMin(e, i)}
          />
        </div>
        <div className="form-group">
          <label htmlFor={`shade-max-${axis}-${i}`}>To</label>
          <input
            name={`shade-max-${axis}-${i}`}
            type={this.getType()}
            className="form-control minmax"
            value={this.getRegionMax(i)}
            onChange={(e) => this.setRegionMax(e, i)}
          />
        </div>
        <i
          className="fa fa-times"
          onClick={() => this.removeRegion(i)}
        ></i>
      </div>)
    );

    return (
      <div>
        <small>
          Optionally, add shaded regions to the axis. Enter from and to values
          in the same format as your data for the axis, e.g., 01/01/2001 - 12/31/2012 for
          dates in the format MM/DD/YYYY.
        </small>
        <button className="btn btn-sm" onClick={this.addRegion}>Add +</button>
        {regions}
      </div>
    );
  },
});
