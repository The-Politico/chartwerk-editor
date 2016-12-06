/**
 * Default datamap options.
 *
 * Available prop represents whether an option is surfaced to the user
 * in datamap dropdown. Alias props are overridden by template creators.
 *
 * (Logic in DataSelect.jsx determines whether option should be disabled based
 * on other selections.)
 *
 * Recommend you don't touch these. :)
 * @type {Array}
 */

export default [
  {
    class: 'base',
    alias: 'base axis',
    available: true,
  },
  {
    class: 'value',
    alias: 'value axis',
    available: true,
  },
  {
    class: 'scale',
    alias: 'scale axis',
    available: true,
  },
  {
    class: 'series',
    alias: 'data series',
    available: true,
  },
  {
    class: 'facet',
    alias: 'faceting column',
    available: true,
  },
  {
    class: 'ignore',
    alias: 'ignored column',
    available: true,
  },
];
