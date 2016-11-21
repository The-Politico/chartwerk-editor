import * as types from '../constants/actions';
import assign from 'object-assign';
import _ from 'lodash';


/**
 * Default datamap options.
 *
 * Available prop represents whether an option is surfaced to the user
 * in datamap dropdown, while disabled logic in DataSelect.jsx determines
 * whether option should be disabled based on other selections. editableValue
 * prop determines whether value prop is editable, which is false for
 * all defaults.
 * @type {Array}
 */
const defaultDatamap = [
  {
    class: 'base',
    alias: 'base axis',
    available: true,
    editableValue: false,
  },
  {
    class: 'value',
    alias: 'value axis',
    available: true,
    editableValue: false,
  },
  {
    class: 'scale',
    alias: 'scale axis',
    available: true,
    editableValue: false,
  },
  {
    class: 'series',
    alias: 'data series',
    available: true,
    editableValue: false,
  },
  {
    class: 'facet',
    alias: 'faceting column',
    available: true,
    editableValue: false,
  },
  {
    class: 'annotation',
    alias: 'annotation column',
    available: true,
    editableValue: false,
  },
  {
    class: 'ignore',
    alias: 'ignored column',
    available: true,
    editableValue: false,
  },
];


/**
 * ui reducer
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
    datamap: defaultDatamap,
  };

  if (typeof ui === 'undefined') {
    return initialState;
  }

  let nextState = assign({}, ui);

  const setAvailable = (dataClass) => {
    const map = nextState.datamap.slice();
    const i = _.indexOf(map, _.find(map, { class: dataClass }));
    map[i].available = !map[i].available;
    return map;
  };

  const setAlias = (dataClass, alias) => {
    const map = nextState.datamap.slice();
    const i = _.indexOf(map, _.find(map, { class: dataClass }));
    map[i].alias = alias;
    return map;
  };

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
    case types.SET_AVAILABLE_DATA_CLASS:
      nextState.datamap = setAvailable(action.dataClass);
      break;
    case types.SET_DATA_CLASS_ALIAS:
      nextState.datamap = setAlias(action.dataClass, action.alias);
      break;
    default:
      return ui;
  }
  return nextState;
};
