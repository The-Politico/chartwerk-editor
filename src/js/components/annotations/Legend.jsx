import React from 'react';
import Keys from './Keys';
import LegendDisplay from './LegendDisplay';


export default React.createClass({

  propTypes: {
    actions: React.PropTypes.object,
    werk: React.PropTypes.object,
  },

  getInitialState() {
    return {
      open: false,
    };
  },

  render() {
    const werk = this.props.werk;

    if (werk.axes.color.range.length < 2) {
      return null;
    }
    return (
      <div id="legend">
        <div>
          <label className="section section-option">
            Do you want a color legend?
            <input
              type="checkbox"
              checked={werk.text.legend.active}
              onClick={() => this.props.actions.setLegendActive()}
            />
            <i className="fa fa-square-o"></i>
            <i className="fa fa-check-square-o"></i>
          </label>
        </div>
        <Keys {...this.props} />
        <LegendDisplay {...this.props} />
      </div>
    );
  },
});
