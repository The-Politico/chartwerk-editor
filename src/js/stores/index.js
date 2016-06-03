"use strict";
const reducer = require('../reducers');
const createStore = require('redux').createStore;
const applyMiddleware = require('redux').applyMiddleware;
const actions = require('../actions');
const thunk = require('redux-thunk').default;
const _ = require('lodash');

const api = require('../misc/api');

const store = createStore(reducer,
  applyMiddleware(thunk)
);

const unsubscribe = store.subscribe(function () {
  window.chartWerk = store.getState();
  api.redraw();
  console.log(store.getState());
  // console.log( JSON.stringify(store.getState(), null, '\t' ) );
  return ;
});

//unsubscribe();

store.dispatch(actions.fetchWerk())
    .then(function(){
      api.injectDependencies(window.chartWerk.scripts.dependencies);
      api.applyScripts(window.chartWerk.scripts);
      api.initialize();
    });

module.exports = store;
