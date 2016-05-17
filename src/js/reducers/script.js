"use strict";
var types = require('../constants/actions');
var assign = require('object-assign');
var _ = require('lodash');

/**
 * script reducer
 * @param {Object} scripts        Previous redux store state tree.
 * @param {Object} action       Action contains type and payload for reducer.
 *                              See actions/index.js for descriptions of
 *                              action params.
 * @returns {Object} nextState  Next redux store state tree.
 */
module.exports = function(scripts, action){

  var initialState = {
    draw: "function draw(){\n}",
    helper: "var werkHelper = {};",
    styles: "",
    html: "",
    dependencies: {
      scripts: [],
      styles: []
    }
  };

  if (typeof scripts === 'undefined') {
      return initialState;
  }

  var nextState = assign({}, scripts);
  switch(action.type){
  case types.API_SCRIPTS:
      nextState = _.merge({}, nextState, action.scripts);
      break;
  case types.SET_DRAW_SCRIPT:
      nextState.draw = action.script;
      break;
  case types.SET_HELPER_SCRIPT:
      nextState.helper = action.script;
      break;
  case types.SET_STYLES:
      nextState.styles = action.styles;
      break;
  case types.SET_HTML:
      nextState.html = action.html;
      break;
  default:
      return scripts;
  }

  return nextState;
};
