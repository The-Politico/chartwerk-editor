import React from 'react';


export default React.createClass({

  propTypes: {
    actions: React.PropTypes.object,
    werk: React.PropTypes.object,
  },

  getInitialState() {
    return {
      activeOpts: 'single',
    };
  },

  render() {
    const werk = this.props.werk;
    const actions = this.props.actions;

    if (!werk.text.legend.active) {
      return null;
    }

    const options = werk.text.legend[this.state.activeOpts].inside ? (
      <div id="legend-inside-opts">
        <button type="button"
          className={werk.text.legend[this.state.activeOpts].background ?
            'btn btn-sm btn-secondary active' : 'btn btn-sm btn-secondary'
          }
          title="Background"
          onClick={() => actions.changeLegendBackground(this.state.activeOpts)}
        >
          BG
        </button>
      </div>
    ) : (
      <div id="legend-inside-opts">
        <button type="button"
          className={werk.text.legend[this.state.activeOpts].align === 'l' ?
            'btn btn-sm btn-secondary active' : 'btn btn-sm btn-secondary'
          }
          title="Align legend container left"
          onClick={() => actions.changeLegendAlign(this.state.activeOpts, 'l')}
        >
          <i className="fa fa-align-left" aria-hidden="true"></i>
        </button>
        <button type="button"
          className={werk.text.legend[this.state.activeOpts].align === 'r' ?
            'btn btn-sm btn-secondary active' : 'btn btn-sm btn-secondary'
          }
          title="Align legend container right"
          onClick={() => actions.changeLegendAlign(this.state.activeOpts, 'r')}
        >
          <i className="fa fa-align-right" aria-hidden="true"></i>
        </button>
      </div>
    );


    return (
      <div id="legend-display-opts">
        <h5>Title</h5>
        <small>If necessary, add a <b>short</b> title.</small>
        <input
          id="legend-title"
          type="text"
          className="form-control"
          maxLength="50"
          placeholder="Legend title"
          value={werk.text.legend.title}
          onChange={(e) => actions.changeLegendTitle(e.target.value)}
        />
        <h5>Display options</h5>
        <small>Set display options for single and double-column chart sizes independently.
        </small>
        <div className="form-group size-switch">
          <img
            src={`${window.chartwerkConfig.staticPrefix}img/icons/singleColumn.png`}
            title="Single-wide"
            className={this.state.activeOpts === 'single' ? 'active' : 'inactive'}
            onClick={() => this.setState({ activeOpts: 'single' })}
            alt="Single-wide"
          />
          <img
            src={`${window.chartwerkConfig.staticPrefix}img/icons/doubleColumn.png`}
            title="Double-wide"
            className={this.state.activeOpts === 'single' ? 'inactive' : 'active'}
            onClick={() => this.setState({ activeOpts: 'double' })}
            alt="Double-wide"
          />
          <button type="button"
            className={werk.text.legend[this.state.activeOpts].inside ?
              'btn btn-sm btn-secondary active' : 'btn btn-sm btn-secondary'
            }
            title="Legend inside the chart space?"
            onClick={() => actions.changeLegendInside(this.state.activeOpts)}
          >
            Inside
          </button>
          {options}
        </div>

      </div>
    );
  },

});
