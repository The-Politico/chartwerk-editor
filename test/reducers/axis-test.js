import { describe, it } from 'mocha';
import expect from 'expect';
import reducer from '../../src/js/reducers/axis';
import * as types from '../../src/js/constants/actions';

const initialState = {
  color: {
    domain: [],
    range: [],
    scheme: 'categorical.default',
    byFacet: false,
    ignoreScale: false,
    quantize: false,
    quantizeProps: {
      column: null,
      groups: 0,
      reverseColors: false,
    },
  },
  base: {
    type: null,
    dateFormat: null,
    min: null,
    max: null,
    label: '',
    prefix: '',
    suffix: '',
    format: {
      double: {
        dateString: 'Y',
        frequency: 1,
        ticks: 7,
        customTicks: [],
      },
      single: {
        dateString: 'Y',
        frequency: 1,
        ticks: 7,
        customTicks: [],
      },
    },
    shadedRegions: [],
  },
  value: {
    min: null,
    max: null,
    label: '',
    prefix: '',
    suffix: '',
    format: {
      double: {
        ticks: 7,
        customTicks: [],
      },
      single: {
        ticks: 7,
        customTicks: [],
      },
    },
    shadedRegions: [],
  },
};

describe('axis reducer', () => {
  it('return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState);
  });

  it('reverse quantize color ramp', () => {
    expect(
      reducer({
        color: {
          range: ['blue', 'red'],
        },
      }, {
        type: types.SET_QUANTIZE_RANGE,
        range: ['red', 'blue'],
      }).color.range
    ).toEqual(['red', 'blue']);
  });
});
