import reducer from '../reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import actions from '../actions';
import thunk from 'redux-thunk';

import * as api from '../misc/api';

const store = createStore(reducer, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

// const unsubscribe =
store.subscribe(() => {
  window.chartWerk = store.getState();
  api.redraw();
  console.log(store.getState());
  // console.log( JSON.stringify(store.getState(), null, '\t' ) );
  return;
});

// unsubscribe();

store.dispatch(actions.fetchWerk())
    .then(() => {
      api.injectDependencies(window.chartWerk.scripts.dependencies);
      api.applyScripts(window.chartWerk.scripts);
      api.initialize();
    });

export default store;
