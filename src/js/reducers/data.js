"use strict";
var types = require('../constants/actions');

/**
 * data reducer
 * @param {Object} data         Previous redux store state tree.
 * @param {Object} action       Action contains type and payload for reducer.
 *                              See actions/index.js for descriptions of
 *                              action params.
 * @returns {Object} nextState  Next redux store state tree.
 */
module.exports = function(data, action){

    var initialState = [];

    if (typeof data === 'undefined') {
        return initialState
    }

    var nextState = data.slice();

    switch(action.type){
    case types.ATTACH_DATA:
        nextState = action.data;
        break;
    default:
        return data;
    }
    return nextState;
};
