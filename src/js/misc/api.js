import _ from 'lodash';
import $ from 'jquery';
import marked from './utils';

export const applyScripts = (scripts) => {
  const applyCSS = (styles) => {
    const node = document.createElement('style');
    node.id = 'injected-chart-styles';
    document.head.appendChild(node);
    node.innerHTML = styles;
  };

  const applyJS = (script) => {
    eval.apply(null, [script]);
  };

  const applyHTML = (html) => {
    document
      .getElementById('chartWerk')
      .innerHTML = html;
  };

  applyCSS(scripts.styles);
  applyJS(scripts.draw);
  applyJS(scripts.helper);
  applyHTML(scripts.html);
};

export const injectDependencies = (dependencies) => {
  _.forEach(dependencies.scripts, src => {
    let script = document.querySelector(`script[src="${src}"]`);
    if (!script) {
      script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = src;
      document.body.appendChild(script);
    }
  });

  _.forEach(dependencies.styles, (href) => {
    let stylesheet = document.querySelector(`link[href="${href}"]`);
    if (!stylesheet) {
      stylesheet = document.createElement('link');
      stylesheet.rel = 'stylesheet';
      stylesheet.href = href;
      document.head.appendChild(stylesheet);
    }
  });

  const injectedStyles = document.getElementById('injected-chart-styles');
  if (injectedStyles) {
    document.head.appendChild(injectedStyles);
  }
};

export const removeDependencies = (dependencies) => {
  _.forEach(dependencies.scripts, src => {
    $(`script[src='${src}']`).remove();
  });

  _.forEach(dependencies.styles, (href) => {
    $(`link[href='${href}']`).remove();
  });
};

export const redraw = _.throttle(() => {
    // Remove all drawn elements before redraw,
    // not including free annotations or chart legends
  if (document.getElementById('chart')) {
    $('#chart').children()
      .not('.annotation.label')
      .not('.chart-legend-container')
      .remove();
  }
  draw(); // eslint-disable-line no-undef
}, 1000);

export const initialize = () => {
  setTimeout(() => {
    redraw();
    $('#loading-modal').fadeOut(250);
  }, 3000);


  $('#chartWerk #headline').html(marked.inlineLexer(window.chartWerk.text.headline, []));
  $('#chartWerk #chatter').html(marked.inlineLexer(window.chartWerk.text.chatter, []));
  $('#chartWerk #footnote').html(marked.inlineLexer(window.chartWerk.text.footnote, []));
  $('#chartWerk #source').html(marked.inlineLexer(window.chartWerk.text.source, []));
  $('#chartWerk #author').html(marked.inlineLexer(window.chartWerk.text.author, []));
};
