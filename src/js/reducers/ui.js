"use strict";
var types = require('../constants/actions');
var assign = require('object-assign');
var _ = require('lodash');

/**
 * data reducer
 * @param {Object} ui         Previous redux store state tree.
 * @param {Object} action       Action contains type and payload for reducer.
 *                              See actions/index.js for descriptions of
 *                              action params.
 * @returns {Object} nextState  Next redux store state tree.
 */
module.exports = function(ui, action){

    var initialState = {
      rawData: null,
    };

    if (typeof ui === 'undefined') {
        return initialState;
    }

    var nextState = assign({},ui);

    switch(action.type){
    case types.API_UI:
        nextState = _.merge({}, nextState, action.ui);
        break;
    case types.SET_RAW_DATA:
        nextState.rawData = action.data;
        break;
    default:
        return ui;
    }
    return nextState;
};
