import * as types from '../constants/actions';

/**
 * data reducer
 * @param {Object} data         Previous redux store state tree.
 * @param {Object} action       Action contains type and payload for reducer.
 *                              See actions/index.js for descriptions of
 *                              action params.
 * @returns {Object} nextState  Next redux store state tree.
 */
export default (data, action) => {
  const initialState = [];

  if (typeof data === 'undefined') {
    return initialState;
  }

  let nextState = data.slice();

  switch (action.type) {
    case types.API_DATA:
      nextState = action.data;
      break;
    case types.ATTACH_DATA:
      nextState = action.data;
      break;
    default:
      return data;
  }
  return nextState;
};
