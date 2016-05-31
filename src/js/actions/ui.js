var types = require('../constants/actions.js');

module.exports.apiUI = function(ui){
    return {
        type: types.API_UI,
        ui: ui
    };
};

module.exports.setRawData = function(data){
    return {
        type: types.SET_RAW_DATA,
        data: data
    };
};
