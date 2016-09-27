import renderSize from './size';
import renderText from './text';
import renderLegend from './legend';
import renderAnnotations from './annotations';

export default {
  render() {
    renderSize();
    window.draw();
    renderText();
    renderLegend();
    renderAnnotations();
  },
};
