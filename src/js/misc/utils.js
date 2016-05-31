var marked = require('marked');

// Enable smart quotes
marked.setOptions({
  smartypants: true
});

module.exports.marked = marked;
