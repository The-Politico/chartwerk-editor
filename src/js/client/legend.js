import marked from './../misc/utils';

/**
 * Render the legend, both categorical and quantized keys.
 * @return {null}
 */
export default function () {
  const werk = window.chartwerk;

  if (werk.text.legend.active) {
    const display = werk.text.legend[werk.ui.size];
    const background = display.background ? 'bg' : '';
    const align = display.align;
    const position = display.position;

    const legendContainer = display.inside ?
      $('#chart') : $('#chart-legend');

    const legendStyles = !display.inside ?
    {
      width: display.width,
    } :
    {
      width: display.width,
      top: position.y,
      left: position.x,
      position: 'absolute',
    };

    const legend =
    `<div class="chart-legend-container clearfix ${align} ${background}">
        <div class="title">
          ${marked.inlineLexer(werk.text.legend.title, [])}
        </div>
      </div>`;

    $(legend)
      .css(legendStyles)
      .appendTo(legendContainer);

    werk.text.legend.keys.forEach((k) => {
      const spread = 100 / werk.axes.color.range.length;

      const key = !werk.axes.color.quantize ?
        // Categorical key
        `<div class="key">
          <div
            class="key-color"
            style="background-color: ${k.color};"
          ></div>
          <div class="key-label">${marked.inlineLexer(k.text, [])}</div>
        </div>`
      :
        // Quantized key
        `<div
          class="key quantized"
          style="width: ${spread}%;"
        >
          <div
            class="key-label"
            style="border-top: 12px solid ${k.color};"
          >${marked.inlineLexer(k.text, [])}</div>
        </div>`;

      $(key).appendTo($('.chart-legend-container'));
    });
  }
}
