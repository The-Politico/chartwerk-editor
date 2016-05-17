"use strict";
var reducer = require('../reducers');
var createStore = require('redux').createStore;
var applyMiddleware = require('redux').applyMiddleware;
var actions = require('../actions');
var thunk = require('redux-thunk').default;
var _ = require('lodash');

var api = require('../misc/api');

var store = createStore(reducer,
  applyMiddleware(thunk)
);

var unsubscribe = store.subscribe(function () {
  window.chartWerk = store.getState();
  api.redraw();
  return console.log(store.getState());
});

//unsubscribe();

store.dispatch(actions.fetchWerk())
    .then(function(){
      api.injectDependencies(window.chartWerk.scripts.dependencies);
      api.applyScripts(window.chartWerk.scripts);
      api.initialize();
    });

module.exports = store;
