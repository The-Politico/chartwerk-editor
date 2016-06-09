import * as types from '../constants/actions.js';

export const apiData = data => ({
  type: types.API_DATA,
  data,
});

export const apiDatamap = datamap => ({
  type: types.API_DATAMAP,
  datamap,
});

export const addBase = column => ({
  type: types.ADD_BASE,
  column,
});

export const addGroup = column => ({
  type: types.ADD_GROUP,
  column,
});

export const addSeries = column => ({
  type: types.ADD_SERIES,
  column,
});

export const addIgnore = column => ({
  type: types.ADD_IGNORE,
  column,
});

export const addAnnotations = column => ({
  type: types.ADD_ANNOTATIONS,
  column,
});

export const removeBase = () => ({
  type: types.REMOVE_BASE,
});

export const removeGroup = () => ({
  type: types.REMOVE_GROUP,
});

export const removeSeries = column => ({
  type: types.REMOVE_SERIES,
  column,
});

export const removeIgnore = column => ({
  type: types.REMOVE_IGNORE,
  column,
});

export const removeAnnotations = column => ({
  type: types.REMOVE_ANNOTATIONS,
  column,
});

export const resetDatamap = () => ({
  type: types.RESET_DATAMAP,
});

export const attachData = data => ({
  type: types.ATTACH_DATA,
  data,
});
