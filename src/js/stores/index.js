"use strict";
var reducer = require('../reducers');
var createStore = require('redux').createStore;
var applyMiddleware = require('redux').applyMiddleware;
var actions = require('../actions');
var thunk = require('redux-thunk').default;

var store = createStore(reducer,
  applyMiddleware(thunk)
);


var unsubscribe = store.subscribe(function () {
  window.chartConfig = store.getState();
  return console.log(store.getState());
});


//unsubscribe();


module.exports = store;

store.dispatch(actions.fetchWerk())
    // For scripts, we apply after setting via API
    .then(function(){
      actions.applyScripts(window.chartConfig.scripts);
    });
