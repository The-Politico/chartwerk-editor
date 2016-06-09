/**
 * Add your own color schemes here as nested arrays of hex color values.
 *
 * We recommend you replicate the structure of categorical, sequential and
 * diverging schemes, as used at http://colorbrewer2.org.
 *
 * If you want to change that structure, the reducer for setting the scheme
 * (SET_COLOR_SCHEME) is written to expect an array at categorical.default.
 * You'll also need to rewrite parseSchemes in the ColorScheme component to
 * match your custom structure.
 *
 * The ColorPicker component is styled to fit an array of 8 colors.
 *
 */
export default {
  categorical: {
    default: [
      '#55ABE1',
      '#E6644D',
      '#9BC453',
      '#C9C9C9',
      '#F59636',
      '#AA70BA',
      '#FEC44F',
      '#7FD8EB',
    ],
  },
  sequential: {
    red: [
      '#fee0d2',
      '#fcbba1',
      '#fc9272',
      '#fb6a4a',
      '#ef3b2c',
      '#cb181d',
      '#a50f15',
      '#67000d',
    ],
    blue: [
      '#deebf7',
      '#c6dbef',
      '#9ecae1',
      '#6baed6',
      '#4292c6',
      '#2171b5',
      '#08519c',
      '#08306b',
    ],
    green: [
      '#e5f5e0',
      '#c7e9c0',
      '#a1d99b',
      '#74c476',
      '#41ab5d',
      '#238b45',
      '#006d2c',
      '#00441b',
    ],
  },
  diverging: {
    redBlue: [
      '#d73027',
      '#f46d43',
      '#fdae61',
      '#fee090',
      '#e0f3f8',
      '#abd9e9',
      '#74add1',
      '#4575b4',
    ],
    redGreen: [
      '#d73027',
      '#f46d43',
      '#fdae61',
      '#fee08b',
      '#d9ef8b',
      '#a6d96a',
      '#66bd63',
      '#1a9850',
    ],
    orangePurple: [
      '#b35806',
      '#e08214',
      '#fdb863',
      '#fee0b6',
      '#d8daeb',
      '#b2abd2',
      '#8073ac',
      '#542788',
    ],
  },
};
