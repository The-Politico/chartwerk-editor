var types = require('../constants/actions.js');


module.exports.apiAxes = function(axes){
  return {
      type: types.API_AXES,
      axes: axes
  };
};

// COLOR AXIS

/**
 * Sets a path that navigates color object (from constants/colors).
 * @param  {string} path    A string that represents the path to a color
 *                          array in constants/colors, accessed via the
 *                          lodash function _.get .
 * @return {Object}         Action payload.
 */
module.exports.setColorScheme = function(path){
    return {
        type: types.SET_COLOR_SCHEME,
        path: path,
    };
};

module.exports.colorByGroup = function(){
  return {
    type: types.COLOR_BY_GROUP
  };
};

module.exports.setQuantize = function(){
    return {
        type: types.SET_QUANTIZE
    };
};

module.exports.unsetQuantize = function(){
    return {
        type: types.UNSET_QUANTIZE
    };
};

module.exports.setQuantizeColumn = function(column){
    return {
        type: types.SET_QUANTIZE_COLUMN,
        column: column
    };
};

module.exports.unsetQuantizeColumn = function(){
    return {
        type: types.UNSET_QUANTIZE_COLUMN
    };
};

module.exports.setQuantizeDomain = function(domain){
  return {
    type: types.SET_QUANTIZE_DOMAIN,
    domain: domain
  };
};

module.exports.setQuantizeRange = function(range){
  return {
    type: types.SET_QUANTIZE_RANGE,
    range: range
  };
};

module.exports.setQuantizeGroups = function(groups){
  return {
    type: types.SET_QUANTIZE_GROUPS,
    groups: groups
  };
};

module.exports.setQuantizeReverse = function(){
  return {
    type: types.SET_QUANTIZE_REVERSE
  };
};

module.exports.setColor = function(column, color){
    return {
        type: types.SET_COLOR,
        column: column,
        color: color
    };
};

module.exports.unsetColor = function(column){
    return {
        type: types.UNSET_COLOR,
        column: column
    };
};

module.exports.resetColor = function(){
    return {
        type: types.RESET_COLOR
    };
};

// BASE AXIS

module.exports.setBaseType = function(datatype){
    return {
        type: types.SET_BASE_TYPE,
        datatype: datatype
    };
};

module.exports.setDateFormat = function(dateFormat){
    return {
        type: types.SET_DATE_FORMAT,
        dateFormat: dateFormat
    };
};

module.exports.unsetDateFormat = function(){
    return {
        type: types.UNSET_DATE_FORMAT,
    };
};

module.exports.setBaseSingleDateString = function(dateString){
  return {
    type: types.SET_BASE_SINGLE_DATESTRING,
    dateString: dateString
  };
};

module.exports.setBaseDoubleDateString = function(dateString){
  return {
    type: types.SET_BASE_DOUBLE_DATESTRING,
    dateString: dateString
  };
};

module.exports.setBaseSingleFrequency = function(frequency){
  return {
    type: types.SET_BASE_SINGLE_FREQUENCY,
    frequency: frequency
  };
};

module.exports.setBaseDoubleFrequency = function(frequency){
  return {
    type: types.SET_BASE_DOUBLE_FREQUENCY,
    frequency: frequency
  };
};

module.exports.setBaseSingleTicks = function(ticks){
  return {
    type: types.SET_BASE_SINGLE_TICKS,
    ticks: ticks
  };
};

module.exports.setBaseDoubleTicks = function(ticks){
  return {
    type: types.SET_BASE_DOUBLE_TICKS,
    ticks: ticks
  };
};

module.exports.setBaseSingleCustomTicks = function(ticks){
  return {
    type: types.SET_BASE_SINGLE_CUSTOMTICKS,
    ticks: ticks
  };
};

module.exports.setBaseDoubleCustomTicks = function(ticks){
  return {
    type: types.SET_BASE_DOUBLE_CUSTOMTICKS,
    ticks: ticks
  };
};

module.exports.setBaseMin = function(min){
  return {
    type: types.SET_BASE_MIN,
    min: min
  };
};

module.exports.setBaseMax = function(max){
  return {
    type: types.SET_BASE_MAX,
    max: max
  };
};

module.exports.setBaseLabel = function(label){
  return {
    type: types.SET_BASE_LABEL,
    label: label
  };
};

module.exports.setBasePrefix = function(prefix){
  return {
    type: types.SET_BASE_PREFIX,
    prefix: prefix
  };
};

module.exports.setBaseSuffix = function(suffix){
  return {
    type: types.SET_BASE_SUFFIX,
    suffix: suffix
  };
};

// VALUE AXIS

module.exports.setValueSingleTicks = function(ticks){
  return {
    type: types.SET_VALUE_SINGLE_TICKS,
    ticks: ticks
  };
};

module.exports.setValueDoubleTicks = function(ticks){
  return {
    type: types.SET_VALUE_DOUBLE_TICKS,
    ticks: ticks
  };
};

module.exports.setValueSingleCustomTicks = function(ticks){
  return {
    type: types.SET_VALUE_SINGLE_CUSTOMTICKS,
    ticks: ticks
  };
};

module.exports.setValueDoubleCustomTicks = function(ticks){
  return {
    type: types.SET_VALUE_DOUBLE_CUSTOMTICKS,
    ticks: ticks
  };
};

module.exports.setValueMin = function(min){
  return {
    type: types.SET_VALUE_MIN,
    min: min
  };
};

module.exports.setValueMax = function(max){
  return {
    type: types.SET_VALUE_MAX,
    max: max
  };
};

module.exports.setValueLabel = function(label){
  return {
    type: types.SET_VALUE_LABEL,
    label: label
  };
};

module.exports.setValuePrefix = function(prefix){
  return {
    type: types.SET_VALUE_PREFIX,
    prefix: prefix
  };
};

module.exports.setValueSuffix = function(suffix){
  return {
    type: types.SET_VALUE_SUFFIX,
    suffix: suffix
  };
};
