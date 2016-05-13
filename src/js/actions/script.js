var types = require('../constants/actions.js');

module.exports.setDrawScript = function(script){
    return {
        type: types.SET_DRAW_SCRIPT,
        script: script
    };
};

module.exports.setHelperScript = function(script){
    return {
        type: types.SET_HELPER_SCRIPT,
        script: script
    };
};

module.exports.setStyles = function(styles){
    return {
        type: types.SET_STYLES,
        styles: styles
    };
};
