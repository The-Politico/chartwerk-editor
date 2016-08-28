import React from 'react';
import $ from 'jquery';

import NumericFormat from './NumericFormat.jsx';
import ShadedRegions from './ShadedRegions';

export default React.createClass({

  propTypes: {
    actions: React.PropTypes.object,
    werk: React.PropTypes.object,
  },

  changeTab(e) {
    e.preventDefault();
    $('a[href="#layout"]').tab('show');
    $('#editor-pane').animate({ scrollTop: 0 }, 300);
  },

  render() {
    if (this.props.werk.datamap.series < 1 &&
      !this.props.werk.datamap.value) {
      return (
        <div>
          <h4>Waiting for a value axis or data series from the Data tab.</h4>
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
        <ShadedRegions {...this.props} axis="value" />

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
  },
});
