import { describe, it } from 'mocha';
import expect from 'expect';
import reducer from '../../src/js/reducers/datamap';
import * as types from '../../src/js/constants/actions';

const initialState = {
  base: null,
  value: null,
  scale: null,
  series: [],
  facet: null,
  annotations: [],
  ignore: [],
};

describe('datamap reducer', () => {
  it('return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState);
  });

  it('add/remove base axis', () => {
    expect(
      reducer({}, {
        type: types.ADD_BASE,
        column: 'test',
      }).base
    ).toEqual('test');

    expect(
      reducer({
        base: 'test',
      }, {
        type: types.REMOVE_BASE,
      }).base
    ).toEqual(null);
  });

  it('add/remove value axis', () => {
    expect(
      reducer({}, {
        type: types.ADD_VALUE,
        column: 'test',
      }).value
    ).toEqual('test');

    // Mutually exclusive w/ series
    expect(
      reducer({
        series: ['test'],
      }, {
        type: types.ADD_VALUE,
      }).series
    ).toEqual([]);
  });
});
