import React from 'react';
import copy from 'copy-to-clipboard';

export default React.createClass({
  propTypes: {
    actions: React.PropTypes.object,
    werk: React.PropTypes.object,
  },

  getInitialState() {
    return {
      single: true,
      code: '',
      heights: {
        single: 0,
        double: 0,
      },
    };
  },

  getHeights() {
    const actions = this.props.actions;
    const size = this.props.werk.ui.size;
    const that = this;

    let single = 0;
    let double = 0;

    if (size === 'single') {
      single = $('#chartWerk').height();
      actions.changePreview('double');
      setTimeout(() => {
        double = $('#chartWerk').height();
        actions.changePreview(size);
      }, 1000); // Allow 1 sec for rendering
    } else {
      double = $('#chartWerk').height();
      actions.changePreview('single');
      setTimeout(() => {
        single = $('#chartWerk').height();
        actions.changePreview(size);
      }, 1000);
    }

    setTimeout(() => {
      that.setState({
        heights: {
          single,
          double,
        },
      });
    }, 2000);
  },

  copyVal() {
    copy(this.state.code);
    // Successful copy
    $('#publish .embed-copy-btn').addClass('success');
    setTimeout(() => {
      $('#publish .embed-copy-btn').removeClass('success');
    }, 2000);
  },


  getEmbedCode(size) {
    const that = this;
    $('#loading-modal .loading-text span').text('Generating');
    $('#loading-modal').show();

    this.getHeights(); // 2 sec round-trip

    setTimeout(() => {
      const code = `<div
        class="chartwerk"
        data-id="${window.chartwerkConfig.chart_id}"
        data-height-single="${this.state.heights.single}"
        data-height-double="${this.state.heights.double}"
        data-size="${size}">
      </div>
      <script src="${window.chartwerkConfig.embed_src}"></script>`;

      that.setState({
        code: code
          .replace(/[\t\n]/g, '') // Remove whitespaces...
          .replace(/\s{2}/g, ' ')
          .replace(/\s{2}/g, ' ')
          .replace(/\s{2}/g, ' ')
          .replace(/> </g, '><'),
      });
      $('#loading-modal').fadeOut(250);
    }, 2500);
  },

  render() {
    return (
      <div id="embed-opts">
        <h4>Embed code</h4>
        <button
          type="button"
          className="btn btn-default btn-lg"
          disabled={window.chartwerkConfig.chart_id === ''}
          onClick={() => this.getEmbedCode('single')}
        >
          Single
        </button>
        <button
          type="button"
          className="btn btn-default btn-lg"
          disabled={window.chartwerkConfig.chart_id === ''}
          onClick={() => this.getEmbedCode('double')}
        >
          Double/Single
        </button>
        <input
          type="text"
          className="embed-code-copy"
          value={this.state.code}
        />
        <button
          className="btn btn-sm embed-copy-btn"
          onClick={this.copyVal}
          disabled={this.state.code === ''}
        >
          Copy <i className="fa fa-clipboard" aria-hidden="true"></i>
        </button>
      </div>
    );
  },
});
