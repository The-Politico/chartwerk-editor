var reducer = require('../reducers');
var createStore = require('redux').createStore;
var actions = require('../actions');

var store = createStore(reducer);


var unsubscribe = store.subscribe(function () {
  return console.log(store.getState());
});


//store.dispatch(actions.addSeries('myDataColumn'));
//store.dispatch(actions.addBase('myColumn'));
//store.dispatch(actions.removeBase('myColumn'));
//store.dispatch(actions.attachData([{a:1},{b:2},{c:3}]));

//unsubscribe();


module.exports = store;
