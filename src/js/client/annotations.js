import marked from './../misc/utils';
import { black } from './../constants/colors';

/**
 * Render annotations for appropriate size rendered chart.
 * @return {null}
 */
export default function () {
  const werk = window.chartwerk;
  const chart = $('#chart');
  chart.css({ position: 'relative' });

  $('#chart .annotation.label').remove();

  werk.text.annotations.forEach((d, i) => {
    if (
      (d.size === 'd' && werk.ui.size === 'double') ||
      (d.size === 's' && werk.ui.size === 'single')
    ) {
      const text = marked.inlineLexer(d.text, []);

      const annotation =
      `<div class="annotation label" data-id="${i}">
        <div class="inner center">
          <p>${text}</p>
        </div>
      </div>`;

      $(annotation)
        .css({
          position: 'absolute',
          left: d.x,
          top: d.y,
          width: d.w,
          height: 'auto',
          color: d.color || black,
        })
        .addClass(() => {
          let cls = `${d.align} ${d.fontSize}`;
          cls = d.background ? `${cls} bg` : cls;
          return cls;
        })
        .appendTo(chart);
    }
  });
}
