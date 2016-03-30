var types = require('../constants/actions.js');

module.exports.addBase = function(column){
    return {
        type: types.ADD_BASE,
        column: column
    };
}

module.exports.addGroup = function(column){
    return {
        type: types.ADD_GROUP,
        column: column
    };
}

module.exports.addSeries = function(column){
    return {
        type: types.ADD_SERIES,
        column: column
    };
}

module.exports.addIgnore = function(column){
    return {
        type: types.ADD_IGNORE,
        column: column
    };
}

module.exports.addAnnotations = function(column){
    return {
        type: types.ADD_ANNOTATIONS,
        column: column
    };
}

module.exports.removeBase = function(){
    return {
        type: types.REMOVE_BASE
    };
}

module.exports.removeGroup = function(){
    return {
        type: types.REMOVE_GROUP
    };
}

module.exports.removeSeries = function(column){
    return {
        type: types.REMOVE_SERIES,
        column: column
    };
}

module.exports.removeIgnore = function(column){
    return {
        type: types.REMOVE_IGNORE,
        column: column
    };
}

module.exports.removeAnnotations = function(column){
    return {
        type: types.REMOVE_ANNOTATIONS,
        column: column
    };
}

module.exports.attachData = function(data){
    return {
        type: types.ATTACH_DATA,
        data: data
    };
}
