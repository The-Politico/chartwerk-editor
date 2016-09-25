import { renderToStaticMarkup as staticRender } from 'react-dom/server';
import React from 'react';
import marked from './misc/utils';
import { black } from './constants/colors';


if (window.chartwerk.ui.size === 'single') {
  $('#chartwerk').addClass('single');
}

$('#chartwerk #headline').html(marked.inlineLexer(window.chartwerk.text.headline, []));
$('#chartwerk #chatter').html(marked.inlineLexer(window.chartwerk.text.chatter, []));
$('#chartwerk #footnote').html(marked.inlineLexer(window.chartwerk.text.footnote, []));
$('#chartwerk #source').html(marked.inlineLexer(window.chartwerk.text.source, []));
$('#chartwerk #author').html(marked.inlineLexer(window.chartwerk.text.author, []));

window.draw();


function renderAnnotations() {
  const chart = $('#chart');
  const werk = window.chartwerk;
  chart.css({ position: 'relative' });

  $('#chart .annotation.label').remove();

  werk.text.annotations.map((d, i) => {
    if (
      (d.size === 's' && werk.ui.size === 'double') ||
      (d.size === 'd' && werk.ui.size === 'single')
    ) {
      return false;
    }

    const text = marked.inlineLexer(d.text, []);

    const editable =
    `<div class="annotation label" data-id="${i}">
      <div class="inner center">
        <p>${text}</p>
      </div>
    </div>`;

    $(editable)
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

    return false;
  });
}

function renderLegend() {
  const werk = window.chartwerk;

  if (!werk.text.legend.active) {
    return null;
  }

  const display = werk.text.legend[werk.ui.size];
  const background = display.background ? 'bg' : '';
  const align = display.align;
  const position = display.position;

  const keys = werk.text.legend.keys.map((key, i) => {
    const spread = 100 / werk.axes.color.range.length;

    // Categorical keys
    return !werk.axes.color.quantize ? (
      <div className="key" key={i}>
        <div
          className="key-color"
          style={{ color: key.color }}
        >&#9724;</div>
        <div className="key-label">{marked.inlineLexer(key.text, [])}</div>
      </div>

    // Quantized keys
    ) : (
      <div
        className="key quantized"
        key={i}
        style={{ width: `${spread}%` }}
      >
        <div
          className="key-label"
          style={{ borderTop: `12px solid ${key.color}` }}
        >{marked.inlineLexer(key.text, [])}</div>
      </div>
    );
  });

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

  const legend = (
    <div
      className={`chart-legend-container clearfix ${align} ${background}`}
      style={legendStyles}
    >
      <div className="title">
        {marked.inlineLexer(werk.text.legend.title, [])}
      </div>
      {keys}
    </div>
  );

  if (!display.inside) {
    $('#chart-legend').append(staticRender(legend));
  } else {
    $('#chart').append(staticRender(legend));
  }
  return null;
}

renderLegend();
renderAnnotations();
