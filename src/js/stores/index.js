"use strict";
var reducer = require('../reducers');
var createStore = require('redux').createStore;
var actions = require('../actions');

var store = createStore(reducer);


var unsubscribe = store.subscribe(function () {
  return console.log(store.getState());
});


//unsubscribe();


module.exports = store;