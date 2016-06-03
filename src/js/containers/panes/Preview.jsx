"use strict";
var React = require('react');
var SizeSwitch = require('./../../components/preview/SizeSwitch.jsx');

module.exports = React.createClass({

  propTypes: {
      actions: React.PropTypes.object,
      werk: React.PropTypes.object
  },

  getSize: function(){
    return this.props.werk.ui.size === 'single' ?
      'single' : 'double';
  },

  render: function() {
    return (
      <div id="preview-pane">

      <SizeSwitch {...this.props} />

      <p>Patch backpack journalist commenters newsroom cafe paywall he said she said reporting, analytics crowdfunding advertising just across the wire monetization blowing up on Twitter paidContent.</p>

      <div id="chartWerk" className={this.getSize()}></div>

      <p> Article Skimmer Groupon should isn't a business model digital first location-based Snarkmarket curmudgeon tags. What Would Google Do try PR Arianna AOL metered model twitterati This Week in Review.</p>
      <p> Pictures of Goats section #twittermakesyoustupid, curation Nook newspaper strike gotta grok it before you rock it newsonomics copyright bot paidContent, hot news doctrine media diet audience atomization overcome iPhone app filters horse-race coverage Gutenberg parenthesis. Josh Marshall just across the wire the audience knows more than I do social media Romenesko open source Sulzberger <span className="glyphicon glyphicon-headphones" aria-hidden="true"></span> Pictures of Goats section filters abundance crowdsourcing rubber cement, paidContent startups should isn't a business model.</p>

      </div>
    );
  }
});
