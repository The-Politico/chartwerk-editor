import * as types from '../constants/actions';
import assign from 'object-assign';
import _ from 'lodash';

/**
 * data reducer
 * @param {Object} ui         Previous redux store state tree.
 * @param {Object} action       Action contains type and payload for reducer.
 *                              See actions/index.js for descriptions of
 *                              action params.
 * @returns {Object} nextState  Next redux store state tree.
 */
export default (ui, action) => {
  const initialState = {
    rawData: null,
    size: 'single',
  };

  if (typeof ui === 'undefined') {
    return initialState;
  }

  let nextState = assign({}, ui);

  switch (action.type) {
    case types.API_UI:
      nextState = _.merge({}, nextState, action.ui);
      break;
    case types.SET_RAW_DATA:
      nextState.rawData = action.data;
      break;
    case types.CHANGE_PREVIEW:
      nextState.size = action.size;
      break;
    default:
      return ui;
  }
  return nextState;
};
