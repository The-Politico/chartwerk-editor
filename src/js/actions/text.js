var types = require('../constants/actions.js');

module.exports.apiText = function(texts){
    return {
      type: types.API_TEXT,
      texts: texts
    };
};

module.exports.setHeadline = function(headline){
  return {
    type: types.SET_HEADLINE,
    headline: headline
  };
};

module.exports.setChatter = function(chatter){
  return {
    type: types.SET_CHATTER,
    chatter: chatter
  };
};

module.exports.setFootnote = function(footnote){
  return {
    type: types.SET_FOOTNOTE,
    footnote: footnote
  };
};

module.exports.setDataSource = function(source){
  return {
    type: types.SET_DATASOURCE,
    source: source
  };
};

module.exports.setAuthor = function(author){
  return {
    type: types.SET_AUTHOR,
    author: author
  };
};
