import * as types from '../constants/actions.js';

export const apiUI = ui => ({
  type: types.API_UI,
  ui,
});

export const setRawData = data => ({
  type: types.SET_RAW_DATA,
  data,
});

export const changePreview = size => ({
  type: types.CHANGE_PREVIEW,
  size,
});
