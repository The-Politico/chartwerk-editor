"use strict";
var types = require('../constants/actions');
var assign = require('object-assign');

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
    draw: "",
    helper: "",
    styles: ""
  };

  if (typeof scripts === 'undefined') {
      return initialState;
  }

  var nextState = assign({}, scripts);
  switch(action.type){
  case types.SET_DRAW_SCRIPT:
      nextState.draw = action.script;
      break;
  case types.SET_HELPER_SCRIPT:
      nextState.helper = action.script;
      break;
  case types.SET_STYLES:
      nextState.styles = action.styles;
      break;
  default:
      return scripts;
  }

  return nextState;
};
