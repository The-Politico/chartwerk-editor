"use strict";
var combineReducers = require('redux').combineReducers;
var datamapReducer = require('./datamap');
var dataReducer = require('./data');
var axisReducer = require('./axis');
var marginReducer = require('./margin');
var scriptReducer = require('./script');

module.exports = combineReducers({
    datamap: datamapReducer,
    data: dataReducer,
    axes: axisReducer,
    margins: marginReducer,
    scripts: scriptReducer
});
