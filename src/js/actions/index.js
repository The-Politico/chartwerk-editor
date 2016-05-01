var types = require('../constants/actions.js');

module.exports.addBase = function(column){
    return {
        type: types.ADD_BASE,
        column: column
    };
};

module.exports.addGroup = function(column){
    return {
        type: types.ADD_GROUP,
        column: column
    };
};

module.exports.addSeries = function(column){
    return {
        type: types.ADD_SERIES,
        column: column
    };
};

module.exports.addIgnore = function(column){
    return {
        type: types.ADD_IGNORE,
        column: column
    };
};

module.exports.addAnnotations = function(column){
    return {
        type: types.ADD_ANNOTATIONS,
        column: column
    };
};

module.exports.removeBase = function(){
    return {
        type: types.REMOVE_BASE
    };
};

module.exports.removeGroup = function(){
    return {
        type: types.REMOVE_GROUP
    };
};

module.exports.removeSeries = function(column){
    return {
        type: types.REMOVE_SERIES,
        column: column
    };
};

module.exports.removeIgnore = function(column){
    return {
        type: types.REMOVE_IGNORE,
        column: column
    };
};

module.exports.removeAnnotations = function(column){
    return {
        type: types.REMOVE_ANNOTATIONS,
        column: column
    };
};

module.exports.resetDatamap = function(){
  return {
    type: types.RESET_DATAMAP
  };
};

module.exports.attachData = function(data){
    return {
        type: types.ATTACH_DATA,
        data: data
    };
};

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
