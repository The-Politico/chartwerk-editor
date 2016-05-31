"use strict";
var types = require('../constants/actions');
var assign = require('object-assign');
var _ = require('lodash');

/**
 * datamap reducer
 * @param {Object} datamap      Previous redux store state tree.
 * @param {Object} action       Action contains type and payload for reducer.
 *                              See actions/index.js for descriptions of
 *                              action params.
 * @returns {Object} nextState  Next redux store state tree.
 */
module.exports = function(datamap, action){

    var initialState = {
        base: null,
        group: null,
        series: [],
        annotations: [],
        ignore: []
    };

    if (typeof datamap === 'undefined') {
        return initialState
    }

    var nextState = assign({},datamap);

    switch(action.type){
    case types.API_DATAMAP:
        nextState = _.merge({}, nextState, action.datamap);
        nextState.series = _.uniq(nextState.series);
        nextState.ignore = _.uniq(nextState.ignore);
        nextState.annotations = _.uniq(nextState.annotations);
        break;
    case types.ADD_BASE:
        nextState.base = action.column;
        break;
    case types.ADD_GROUP:
        nextState.group = action.column;
        break;
    case types.ADD_SERIES:
        nextState.series.push(action.column);
        break;
    case types.ADD_IGNORE:
        nextState.ignore.push(action.column);
        break;
    case types.ADD_ANNOTATIONS:
        nextState.annotations.push(action.column);
        break;
    case types.REMOVE_BASE:
        nextState.base = null;
        break;
    case types.REMOVE_GROUP:
        nextState.group = null;
        break;
    case types.REMOVE_SERIES:
        _.remove(nextState.series,
            function(n){
                return n == action.column;
        });
        break;
    case types.REMOVE_IGNORE:
        _.remove(nextState.ignore,
            function(n){
                return n == action.column;
        });
        break;
    case types.REMOVE_ANNOTATIONS:
        _.remove(nextState.annotations,
            function(n){
                return n == action.column;
        });
        break;
    case types.RESET_DATAMAP:
        nextState = initialState;
        break;
    default:
        return datamap;
    }
    return nextState;
};
