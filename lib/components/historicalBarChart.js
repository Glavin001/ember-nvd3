Ember.NVD3.HistoricalBarChart = Ember.NVD3.ChartComponent.extend({

  marginLeft: 100,
  marginBottom: 100,

  _chartModel: "historicalBarChart",

  xAxisTickFormat: d3.format(',.1f'),
  yAxisTickFormat: d3.format(',.2f')

});

Ember.Handlebars.helper('nvd3-historical-bar-chart', Ember.NVD3.HistoricalBarChart);
