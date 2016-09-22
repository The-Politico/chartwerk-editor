import React from 'react';
import marked from './../../misc/utils';


module.exports = React.createClass({

  propTypes: {
    actions: React.PropTypes.object,
    werk: React.PropTypes.object,
    limits: React.PropTypes.objectOf(React.PropTypes.number),
  },

  getDefaultProps() {
    return {
      limits: {
        head: 75,
        chat: 200,
        foot: 100,
        data: 75,
        auth: 50,
      },
    };
  },

  getInitialState() {
    return {
      focus: null,
    };
  },

  changeText(type, e) {
    const actions = this.props.actions;
    switch (type) {
      case 'head':
        actions.setHeadline(e.target.value);
        actions.setChartTitle(e.target.value);
        $('#chartwerk #headline').html(
          marked.inlineLexer(e.target.value, [])
        );
        break;
      case 'chat':
        actions.setChatter(e.target.value);
        $('#chartwerk #chatter').html(
          marked.inlineLexer(e.target.value, [])
        );
        break;
      case 'foot':
        actions.setFootnote(e.target.value);
        $('#chartwerk #footnote').html(
          marked.inlineLexer(e.target.value, [])
        );
        break;
      case 'data':
        actions.setDataSource(e.target.value);
        $('#chartwerk #source').html(
          marked.inlineLexer(e.target.value, [])
        );
        break;
      case 'auth':
        actions.setAuthor(e.target.value);
        $('#chartwerk #author').html(
          marked.inlineLexer(e.target.value, [])
        );
        break;
      default:
        break;
    }
  },

  calcLimit(type) {
    const limits = this.props.limits;
    const text = this.props.werk.text;
    switch (type) {
      case 'head':
        return type === this.state.focus ?
          limits.head - text.headline.length : null;
      case 'chat':
        return type === this.state.focus ?
          limits.chat - text.chatter.length : null;
      case 'foot':
        return type === this.state.focus ?
          limits.foot - text.footnote.length : null;
      case 'data':
        return type === this.state.focus ?
          limits.data - text.source.length : null;
      case 'auth':
        return type === this.state.focus ?
          limits.auth - text.author.length : null;
      default:
        break;
    }
    return null;
  },

  addFocus(type) {
    this.setState({
      focus: type,
    });
  },

  removeFocus() {
    this.setState({
      focus: null,
    });
  },

  changeTab(e) {
    e.preventDefault();
    $('a[href="#annotations"]').tab('show');
    $('#editor-pane').animate({ scrollTop: 0 }, 300);
  },

  render() {
    const werk = this.props.werk;

    return (
      <div>
        <h4>Chart text</h4>
        <small>Add chart text, like a headline, chatter and footnote below.
          As a general rule, you should be brief and let your chart do the
          talking. To help, the inputs below are limited by character count.
        </small>
        <div className="form-group">
          <label>Headline
            <span className="text-countdown">{this.calcLimit('head')}</span>
          </label>
          <input
            type="text"
            className="form-control"
            maxLength={this.props.limits.head}
            placeholder="Use sentence-case capitalization"
            onChange={this.changeText.bind(this, 'head')}
            onFocus={this.addFocus.bind(this, 'head')}
            onBlur={this.removeFocus}
            value={werk.text.headline}
          />
        </div>
        <div className="form-group">
          <label>Chatter
            <span className="text-countdown">{this.calcLimit('chat')}</span>
          </label>
          <textarea
            className="form-control"
            rows="2"
            maxLength={this.props.limits.chat}
            placeholder="A brief note"
            onChange={this.changeText.bind(this, 'chat')}
            onFocus={this.addFocus.bind(this, 'chat')}
            onBlur={this.removeFocus}
            value={werk.text.chatter}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Footnote
            <span className="text-countdown">{this.calcLimit('foot')}</span>
          </label>
          <textarea
            className="form-control"
            rows="2"
            maxLength={this.props.limits.foot}
            placeholder="An even briefer note"
            onChange={this.changeText.bind(this, 'foot')}
            onFocus={this.addFocus.bind(this, 'foot')}
            onBlur={this.removeFocus}
            value={werk.text.footnote}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Data source
            <span className="text-countdown">{this.calcLimit('data')}</span>
          </label>
          <input
            type="text"
            className="form-control"
            maxLength={this.props.limits.data}
            placeholder="e.g., “U.S. Census Bureau” or “Dallas Morning News analysis”"
            onChange={this.changeText.bind(this, 'data')}
            onFocus={this.addFocus.bind(this, 'data')}
            onBlur={this.removeFocus}
            value={werk.text.source}
          />
        </div>
        <div className="form-group">
          <label>Author
            <span className="text-countdown">{this.calcLimit('auth')}</span>
          </label>
          <input
            type="text"
            className="form-control"
            maxLength={this.props.limits.auth}
            placeholder="e.g., Jane Doe"
            onChange={this.changeText.bind(this, 'auth')}
            onFocus={this.addFocus.bind(this, 'auth')}
            onBlur={this.removeFocus}
            value={werk.text.author}
          />
        </div>
        <div className="guidepost">
          <h4>
            <a onClick={this.changeTab} href="">
              <b>Next:</b> Annotations
              <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
            </a>
          </h4>
        </div>
      </div>
    );
  },

});
