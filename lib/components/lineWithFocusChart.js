Ember.NVD3.LineWithFocusChart = Ember.NVD3.ChartComponent.extend({

  marginRight: 70,

  _chartModel: "lineWithFocusChart"

});

Ember.Handlebars.helper('nvd3-line-with-focus-chart', Ember.NVD3.LineWithFocusChart);
