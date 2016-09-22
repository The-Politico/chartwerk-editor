import React from 'react';


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
    const werk = this.props.werk;
    const actions = this.props.actions;

    if (!werk.datamap.scale) {
      return (
        <div>
          <h4>No scale axis selected on the Data tab.</h4>

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

    // Only have prefix/suffix if quantized color scale.
    const prefixSuffix = werk.axes.color.quantize ? (
      <div className="inline-exclusive-format clearfix numeric">
        <small>
          Prefix and suffix annotations on this axis are applied to tooltips
          and other data point labels.
        </small>
        <br />
        <div className="form-group">
          <label htmlFor="axis-prefix">Prefix</label>
          <input
            type="text"
            className="form-control presuffix"
            value={werk.axes.scale.prefix}
            onChange={(e) => actions.setScalePrefix(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="axis-suffix">Suffix</label>
          <input
            type="text"
            className="form-control presuffix"
            value={werk.axes.scale.suffix}
            onChange={(e) => actions.setScaleSuffix(e.target.value)}
          />
        </div>
      </div>
    ) : null;

    return (
      <div>
        <h4>Scale axis: <span className="basename">{werk.datamap.scale}</span></h4>

        {prefixSuffix}

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
