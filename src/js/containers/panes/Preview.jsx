import React from 'react';

import SizeSwitch from './../../components/preview/SizeSwitch';

module.exports = React.createClass({

  propTypes: {
    actions: React.PropTypes.object,
    werk: React.PropTypes.object,
  },

  componentWillMount() {
    window.chartwerkAlert = {
      /**
       * Global warning messenger that can be thrown with custom alerts from
       * within a chart template.
       * @param  {String} message An alert message.
       * @return {null}
       */
      warn(message) {
        const alert = $('#chart-edit-alerts .alert-warning');
        const ul = $('ul', alert);
        if ($('li', ul).length < 3) {
          $('<li/>').text(message).appendTo(ul);
        } else if ($('li', ul).length === 3) {
          $('<li/>').html('<em>& more...</em>').appendTo(ul);
        }
        alert.slideDown();
        clearTimeout(window.chartwerkWarnTimeout);
        window.chartwerkWarnTimeout = setTimeout(() => {
          alert.slideUp(() => ul.empty());
          delete window.chartwerkWarnTimeout;
        }, 5000);
      },
      /**
       * Global error messenger that can be thrown with custom alerts from
       * within a chart template.
       * @param  {String} message An alert message.
       * @return {null}
       */
      error(message) {
        const alert = $('#chart-edit-alerts .alert-danger');
        const ul = $('ul', alert);
        if ($('li', ul).length < 3) {
          $('<li/>').text(message).appendTo(ul);
        } else if ($('li', ul).length === 3) {
          $('<li/>').html('<em>& more...</em>').appendTo(ul);
        }
        alert.slideDown();
        clearTimeout(window.chartwerkErrorTimeout);
        window.chartwerkErrorTimeout = setTimeout(() => {
          alert.slideUp(() => ul.empty());
          delete window.chartwerkErrorTimeout;
        }, 5000);
      },
    };
  },

  getSize() {
    return this.props.werk.ui.size === 'single' ?
      'single' : 'double';
  },

  render() {
    return (
      <div id="preview-pane">
        <SizeSwitch {...this.props} />
        <div id="chart-edit-alerts">
          <div className="alert alert-warning" hidden>
            <h4><span className="display">Chartwerk</span> Warning</h4>
            <ul></ul>
          </div>
          <div className="alert alert-danger" hidden>
            <h4><span className="display">Chartwerk</span> Error</h4>
            <ul></ul>
          </div>
        </div>
        <p>
          Patch backpack journalist commenters newsroom cafe paywall he said
          she said reporting, analytics crowdfunding advertising just across
          the wire monetization blowing up on Twitter paidContent.
        </p>

        <div id="chartwerk" className={this.getSize()}></div>

        <p>
          Article Skimmer Groupon should isn't a business model digital first
          location-based Snarkmarket curmudgeon tags. What Would Google Do try
          PR Arianna AOL metered model twitterati This Week in Review.
        </p>
        <p>
          Pictures of Goats section #twittermakesyoustupid, curation Nook
          newspaper strike gotta grok it before you rock it newsonomics
          copyright bot paidContent, Wilonsky hot news doctrine media diet audience
          atomization overcome iPhone app filters horse-race coverage Gutenberg
          parenthesis. Josh Marshall just across the wire the audience knows
          more than I do social media Romenesko open source Sulzberger
          <span className="glyphicon glyphicon-headphones" aria-hidden="true">
          </span> Pictures of Goats section filters abundance crowdsourcing
          rubber cement, paidContent startups should isn't a business model.
        </p>
      </div>
    );
  },
});
