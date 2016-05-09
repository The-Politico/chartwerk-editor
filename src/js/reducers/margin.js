"use strict";
var types = require('../constants/actions');
var assign = require('object-assign');
var _ = require('lodash');

/**
 * margins reducer
 * @param {Object} margins         Previous redux store state tree.
 * @param {Object} action       Action contains type and payload for reducer.
 *                              See actions/index.js for descriptions of
 *                              action params.
 * @returns {Object} nextState  Next redux store state tree.
 */
module.exports = function(margins, action){

  var initialState = {
    single: {
      top: 0.05,
      right: 0.02,
      bottom: 0.05,
      left: 0.02
    },
    double: {
      top: 0.05,
      right: 0.02,
      bottom: 0.05,
      left: 0.02
    }
  };

  if (typeof margins === 'undefined') {
      return initialState;
  }

  var nextState = assign({},margins);

  switch(action.type){
  case types.SET_MARGIN_SINGLE_TOP:
      nextState.single.top = action.percent;
      break;
  case types.SET_MARGIN_SINGLE_BOTTOM:
      nextState.single.bottom = action.percent;
      break;
  case types.SET_MARGIN_SINGLE_RIGHT:
      nextState.single.right = action.percent;
      break;
  case types.SET_MARGIN_SINGLE_LEFT:
      nextState.single.left = action.percent;
      break;
  case types.SET_MARGIN_DOUBLE_TOP:
      nextState.double.top = action.percent;
      break;
  case types.SET_MARGIN_DOUBLE_BOTTOM:
      nextState.double.bottom = action.percent;
      break;
  case types.SET_MARGIN_DOUBLE_RIGHT:
      nextState.double.right = action.percent;
      break;
  case types.SET_MARGIN_DOUBLE_LEFT:
      nextState.double.left = action.percent;
      break;
  default:
      return margins;
  }

  return nextState;
};
