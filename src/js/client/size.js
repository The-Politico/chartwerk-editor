/**
 * Size the chart by adding a class to the
 * chart container when single-wide.
 * @return {null}
 */
export default function () {
  if (window.chartwerk.ui.size === 'single') {
    $('#chartwerk').addClass('single');
  }
}
