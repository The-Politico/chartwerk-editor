var types = require('../constants/actions');

var initialState = [];

module.exports = function(data, action){
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
