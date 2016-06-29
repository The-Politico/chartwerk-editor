import React from 'react';


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

  render() {
    const werk = this.props.werk;
    const actions = this.props.actions;

    if (!werk.text.legend.active) {
      return null;
    }

    return (
      <div id="legend-display-opts">
        <h5>Legend display</h5>
        <small>If necessary, add a short title to your legend.</small>
        <input
          id="legend-title"
          type="text"
          className="form-control"
          maxLength="50"
          placeholder="Legend title"
          value={werk.text.legend.title}
          onChange={(e) => actions.changeLegendTitle(e.target.value)}
        />
        <small>Options for the single-column chart are used for the
          double-column chart by default. Click the double-column options to
          set them independently.
        </small>
        <div className="form-group size-switch">
          <img
            src="img/icons/singleColumn.png"
            title="Single column"
            className={this.state.activeOpts === 'single' ? 'active' : 'inactive'}
            alt="Single column"
          />
          <img
            src="img/icons/doubleColumn.png"
            title="Double column"
            className={this.state.activeOpts === 'single' ? 'inactive' : 'active'}
            alt="Double column"
          />
        </div>
      </div>
    );
  },

});
