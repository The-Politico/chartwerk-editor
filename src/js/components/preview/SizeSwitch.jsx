import React from 'react';


export default React.createClass({

  propTypes: {
    actions: React.PropTypes.object,
    werk: React.PropTypes.object,
  },

  changeSize(size) {
    const actions = this.props.actions;
    actions.changePreview(size);
  },

  getChecked(size) {
    return size === this.props.werk.ui.size;
  },

  render() {
    return (
      <div className="switch-toggle preview-view-toggle">
        <input id="size-mobile" className="rebuild" name="size-select"
          type="radio" checked={this.getChecked('single')}
        />
        <label htmlFor="size-mobile" onClick={() => this.changeSize('single')}>
          Single-wide
        </label>
        <input id="size-desktop" className="rebuild" name="size-select"
          type="radio" checked={this.getChecked('double')}
        />
        <label htmlFor="size-desktop" onClick={() => this.changeSize('double')}>
          Double-wide
        </label>
        <a></a>
      </div>
    );
  },
});
