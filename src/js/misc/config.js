import urljoin from 'url-join';

export const locations = {
  chart: window.chartwerkConfig.chart_id !== '' ?
    `${urljoin(
      window.chartwerkConfig.chart_api,
      window.chartwerkConfig.chart_id
    )}/` : window.chartwerkConfig.chart_api, // Have to add trailing slash, cf. https://github.com/jfromaniello/url-join/issues/10
  template: window.chartwerkConfig.template_id !== '' ?
    `${urljoin(
      window.chartwerkConfig.template_api,
      window.chartwerkConfig.template_id
    )}/` : window.chartwerkConfig.template_api,
  templateTag: window.chartwerkConfig.template_tags_api,
};
