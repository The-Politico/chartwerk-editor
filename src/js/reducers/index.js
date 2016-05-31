"use strict";
var combineReducers = require('redux').combineReducers;
var datamapReducer = require('./datamap');
var dataReducer = require('./data');
var axisReducer = require('./axis');
var marginReducer = require('./margin');
var textReducer = require('./text');
var scriptReducer = require('./script');
var uiReducer = require('./ui');

module.exports = combineReducers({
    datamap: datamapReducer,
    data: dataReducer,
    axes: axisReducer,
    margins: marginReducer,
    text: textReducer,
    scripts: scriptReducer,
    ui: uiReducer
});
