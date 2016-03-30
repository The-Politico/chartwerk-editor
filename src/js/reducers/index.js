var combineReducers = require('redux').combineReducers;
var datamapReducer = require('./datamap');
var dataReducer = require('./data');

module.exports = combineReducers({
    datamap: datamapReducer,
    data: dataReducer
});
