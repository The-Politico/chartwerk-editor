"use strict";
var types = require('../constants/actions');
var assign = require('object-assign');
var _ = require('lodash');

/**
 * text reducer
 * @param {Object} texts        Previous redux store state tree.
 * @param {Object} action       Action contains type and payload for reducer.
 *                              See actions/index.js for descriptions of
 *                              action params.
 * @returns {Object} nextState  Next redux store state tree.
 */
module.exports = function(texts, action){

  var initialState = {
    headline: "",
    chatter: "",
    footnote: "",
    source: "",
    author: ""
  };

  if (typeof texts === 'undefined') {
      return initialState;
  }

  var nextState = assign({}, texts);
  switch(action.type){
  case types.API_TEXT:
      nextState = _.merge({}, nextState, action.texts);
      break;
  case types.SET_HEADLINE:
    nextState.headline = action.headline;
    break;
  case types.SET_CHATTER:
    nextState.chatter = action.chatter;
    break;
  case types.SET_FOOTNOTE:
    nextState.footnote = action.footnote;
    break;
  case types.SET_DATASOURCE:
    nextState.source = action.source;
    break;
  case types.SET_AUTHOR:
    nextState.author = action.author;
    break;
  default:
      return texts;
  }

  return nextState;
};
