"use strict";
var combineReducers = require('redux').combineReducers;
var datamapReducer = require('./datamap');
var dataReducer = require('./data');
var axisReducer = require('./axis');

module.exports = combineReducers({
    datamap: datamapReducer,
    data: dataReducer,
    axes: axisReducer
});
