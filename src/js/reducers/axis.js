"use strict";
var types = require('../constants/actions');
var assign = require('object-assign');
var _ = require('lodash');

/**
 * axis reducer
 * @param {Object} axis         Previous redux store state tree.
 * @param {Object} action       Action contains type and payload for reducer.
 *                              See actions/index.js for descriptions of
 *                              action params.
 * @returns {Object} nextState  Next redux store state tree.
 */
module.exports = function(axis, action){

    var initialState = {
        color: {
            domain: [],
            range: [],
            scheme: 'categorical.default',
            quantize: false,
            quantizeColumn: null
        },
        base: {
          type: null,
          dateFormat: null,
          min: null,
          max: null,
          label: "",
          prefix: "",
          suffix: "",
          format: {
            double:{
              dateString: "Y",
              frequency: 1,
              ticks: 7,
              customTicks: []
            },
            single:{
              dateString: "Y",
              frequency: 1,
              ticks: 7,
              customTicks: []
            }
          }
        },
        value: {
          min: null,
          max: null,
          label: "",
          prefix: "",
          suffix: "",
          format: {
            double:{
              ticks: 7,
              customTicks: []
            },
            single:{
              ticks: 7,
              customTicks: []
            }
          }
        }
    };

    if (typeof axis === 'undefined') {
        return initialState;
    }

    var nextState = assign({},axis),
        i;

    switch(action.type){
    case types.API_AXES:
        nextState = _.merge({}, nextState, action.axes);
        break;
    /**
     * COLOR AXIS
     */
    case types.SET_COLOR_SCHEME:
        nextState.color.scheme = action.path;
        break;
    case types.SET_QUANTIZE:
        nextState.color.quantize = true;
        break;
    case types.UNSET_QUANTIZE:
        nextState.color.quantize = false;
        nextState.color.quantizeColumn = null;
        break;
    case types.SET_QUANTIZE_COLUMN:
        nextState.color.quantizeColumn = action.column;
        break;
    case types.UNSET_QUANTIZE_COLUMN:
        nextState.color.quantizeColumn = null;
        break;
    case types.SET_QUANTIZE_DOMAIN:
        nextState.color.domain = action.domain;
        break;
    case types.SET_QUANTIZE_RANGE:
        nextState.color.range = action.range;
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
    /**
     * BASE AXIS
     */
    case types.SET_BASE_TYPE:
        nextState.base.type = action.datatype;
        break;
    case types.SET_DATE_FORMAT:
        nextState.base.dateFormat = action.dateFormat;
        break;
    case types.UNSET_DATE_FORMAT:
        nextState.base.dateFormat = null;
        break;
    case types.SET_BASE_SINGLE_DATESTRING:
        nextState.base.format.single.dateString = action.dateString;
        break;
    case types.SET_BASE_DOUBLE_DATESTRING:
        nextState.base.format.double.dateString = action.dateString;
        break;
    case types.SET_BASE_SINGLE_FREQUENCY:
        nextState.base.format.single.frequency = action.frequency;
        break;
    case types.SET_BASE_DOUBLE_FREQUENCY:
        nextState.base.format.double.frequency = action.frequency;
        break;
    case types.SET_BASE_SINGLE_TICKS:
        nextState.base.format.single.ticks = action.ticks;
        break;
    case types.SET_BASE_SINGLE_CUSTOMTICKS:
        nextState.base.format.single.customTicks = action.ticks;
        break;
    case types.SET_BASE_DOUBLE_TICKS:
        nextState.base.format.double.ticks = action.ticks;
        break;
    case types.SET_BASE_DOUBLE_CUSTOMTICKS:
        nextState.base.format.double.customTicks = action.ticks;
        break;
    case types.SET_BASE_MIN:
        nextState.base.min = action.min;
        break;
    case types.SET_BASE_MAX:
        nextState.base.max = action.max;
        break;
    case types.SET_BASE_LABEL:
        nextState.base.label = action.label;
        break;
    case types.SET_BASE_PREFIX:
        nextState.base.prefix = action.prefix;
        break;
    case types.SET_BASE_SUFFIX:
        nextState.base.suffix = action.suffix;
        break;
    /**
     * VALUE AXIS
     */
    case types.SET_VALUE_SINGLE_TICKS:
        nextState.value.format.single.ticks = action.ticks;
        break;
    case types.SET_VALUE_SINGLE_CUSTOMTICKS:
        nextState.value.format.single.customTicks = action.ticks;
        break;
    case types.SET_VALUE_DOUBLE_TICKS:
        nextState.value.format.double.ticks = action.ticks;
        break;
    case types.SET_VALUE_DOUBLE_CUSTOMTICKS:
        nextState.value.format.double.customTicks = action.ticks;
        break;
    case types.SET_VALUE_MIN:
        nextState.value.min = action.min;
        break;
    case types.SET_VALUE_MAX:
        nextState.value.max = action.max;
        break;
    case types.SET_VALUE_LABEL:
        nextState.value.label = action.label;
        break;
    case types.SET_VALUE_PREFIX:
        nextState.value.prefix = action.prefix;
        break;
    case types.SET_VALUE_SUFFIX:
        nextState.value.suffix = action.suffix;
        break;
    default:
        return axis;
    }
    return nextState;
};
