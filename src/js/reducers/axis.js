"use strict";
var types = require('../constants/actions');
var assign = require('object-assign');
var _ = require('lodash');

var initialState = {
    color: {
        domain: [],
        range: [],
        scheme: 'categorical.default'
    },
    base: {
        annotations: [],
        customTicks: [],
        dateFormat: null,
        freqTicks: "",
        label: "",
        max: null,
        min: null,
        numTicks: null,
        prefix: "",
        suffix: "",
        type: ""
    },
    value: {
        annotations: [],
        customTicks: [],
        label: "",
        max: null,
        min: null,
        numTicks: null,
        prefix: "",
        suffix: ""
    }
};

/**
 * datamap reducer
 * @param {Object} axis         Previous redux store state tree.
 * @param {Object} action       Action contains type and payload for reducer.
 *                              See actions/index.js for descriptions of
 *                              action params.
 * @returns {Object} nextState  Next redux store state tree.
 */
module.exports = function(axis, action){
    if (typeof axis === 'undefined') {
        return initialState;
    }

    var nextState = assign({},axis),
        i;

    switch(action.type){
    case types.SET_COLOR_SCHEME:
        nextState.color.scheme = action.path;
        break;
    case types.SET_COLOR:
        i = nextState.color.domain.indexOf(action.column);
        if(i > -1){
            nextState.color.range[i] = action.color;
        }else{
            nextState.color.domain.push(action.column);
            nextState.color.range.push(action.color);
        }

        break;
    case types.UNSET_COLOR:
        i = nextState.color.domain.indexOf(action.column);
        if(i > -1){
            nextState.color.domain.splice(i,1);
            nextState.color.range.splice(i,1);
        }
        break;
    case types.RESET_COLOR:
        nextState.color.domain = [];
        nextState.color.range = [];
        break;
    case types.SET_BASE_TYPE:
        nextState.base.type = action.datatype;
        break;
    case types.SET_DATE_FORMAT:
        nextState.base.dateFormat = action.dateFormat;
        break;
    case types.UNSET_DATE_FORMAT:
        nextState.base.dateFormat = null;
        break;
    default:
        return axis;
    }
    return nextState;
}
