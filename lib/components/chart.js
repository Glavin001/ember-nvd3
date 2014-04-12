Ember.NVD3.ChartComponent = Ember.Component.extend({
  templateName: "nvd3-chart",
  classNames: []
});

Ember.Handlebars.helper('nvd3-chart', Ember.NVD3.ChartComponent);
