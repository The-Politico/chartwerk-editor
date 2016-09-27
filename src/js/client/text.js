import marked from './../misc/utils';

/**
 * Render text to various divs.
 * @return {null}
 */
export default function () {
  $('#chartwerk #headline').html(marked.inlineLexer(window.chartwerk.text.headline, []));
  $('#chartwerk #chatter').html(marked.inlineLexer(window.chartwerk.text.chatter, []));
  $('#chartwerk #footnote').html(marked.inlineLexer(window.chartwerk.text.footnote, []));
  $('#chartwerk #source').html(marked.inlineLexer(window.chartwerk.text.source, []));
  $('#chartwerk #author').html(marked.inlineLexer(window.chartwerk.text.author, []));
}
