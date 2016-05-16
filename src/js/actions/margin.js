var types = require('../constants/actions.js');

module.exports.apiMargins = function(margins){
    return{
      type: types.API_MARGINS,
      margins: margins
    };
};

module.exports.setMarginSingleTop = function(percent){
    return {
        type: types.SET_MARGIN_SINGLE_TOP,
        percent: percent
    };
};

module.exports.setMarginSingleBottom = function(percent){
    return {
        type: types.SET_MARGIN_SINGLE_BOTTOM,
        percent: percent
    };
};

module.exports.setMarginSingleRight = function(percent){
    return {
        type: types.SET_MARGIN_SINGLE_RIGHT,
        percent: percent
    };
};

module.exports.setMarginSingleLeft = function(percent){
    return {
        type: types.SET_MARGIN_SINGLE_LEFT,
        percent: percent
    };
};

module.exports.setMarginDoubleTop = function(percent){
    return {
        type: types.SET_MARGIN_DOUBLE_TOP,
        percent: percent
    };
};

module.exports.setMarginDoubleBottom = function(percent){
    return {
        type: types.SET_MARGIN_DOUBLE_BOTTOM,
        percent: percent
    };
};

module.exports.setMarginDoubleRight = function(percent){
    return {
        type: types.SET_MARGIN_DOUBLE_RIGHT,
        percent: percent
    };
};

module.exports.setMarginDoubleLeft = function(percent){
    return {
        type: types.SET_MARGIN_DOUBLE_LEFT,
        percent: percent
    };
};
