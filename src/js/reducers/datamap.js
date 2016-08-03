import * as types from '../constants/actions';
import assign from 'object-assign';
import _ from 'lodash';

/**
 * datamap reducer
 * @param {Object} datamap      Previous redux store state tree.
 * @param {Object} action       Action contains type and payload for reducer.
 *                              See actions/index.js for descriptions of
 *                              action params.
 * @returns {Object} nextState  Next redux store state tree.
 */
export default (datamap, action) => {
  const initialState = {
    base: null,
    value: null,
    scale: null,
    series: [],
    facet: null,
    annotations: [],
    ignore: [],
  };

  if (typeof datamap === 'undefined') {
    return initialState;
  }

  let nextState = assign({}, datamap);

  switch (action.type) {
    case types.API_DATAMAP:
      nextState = _.merge({}, nextState, action.datamap);
      nextState.series = _.uniq(nextState.series);
      nextState.ignore = _.uniq(nextState.ignore);
      nextState.annotations = _.uniq(nextState.annotations);
      break;
    case types.ADD_BASE:
      nextState.base = action.column;
      break;
    case types.ADD_VALUE:
      nextState.value = action.column;
      nextState.series = []; // mutually exclusive with data series
      break;
    case types.ADD_SCALE:
      nextState.scale = action.column;
      nextState.series = []; // mutually exclusive with data series
      break;
    case types.ADD_SERIES:
      nextState.series.push(action.column);
      nextState.value = null; // mutually exclusive with value axis
      nextState.scale = null; // mutually exclusive with scale axis
      break;
    case types.ADD_FACET:
      nextState.facet = action.column;
      break;
    case types.ADD_ANNOTATIONS:
      nextState.annotations.push(action.column);
      break;
    case types.ADD_IGNORE:
      nextState.ignore.push(action.column);
      break;
    case types.REMOVE_BASE:
      nextState.base = null;
      break;
    case types.REMOVE_VALUE:
      nextState.value = null;
      break;
    case types.REMOVE_SCALE:
      nextState.scale = null;
      break;
    case types.REMOVE_SERIES:
      _.remove(nextState.series,
          n => n === action.column);
      break;
    case types.REMOVE_FACET:
      nextState.facet = null;
      break;
    case types.REMOVE_ANNOTATIONS:
      _.remove(nextState.annotations,
          n => n === action.column);
      break;
    case types.REMOVE_IGNORE:
      _.remove(nextState.ignore,
          n => n === action.column);
      break;
    case types.RESET_DATAMAP:
      nextState = initialState;
      break;
    default:
      return datamap;
  }
  return nextState;
};
