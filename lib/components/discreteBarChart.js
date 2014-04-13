Ember.NVD3.DiscreteBarChart = Ember.NVD3.ChartComponent.extend({

  _chartModel: "discreteBarChart",

  x: function(d,i) {
    return d.label;
  },
  y: function(d,i) {
    return d.value;
  },

  customizeChart: function(chart) {
      chart
      .staggerLabels(true)
      //.staggerLabels(historicalBarChart[0].values.length > 8)
      .tooltips(false)
      .showValues(true);

      return chart;
  }

});

Ember.Handlebars.helper('nvd3-discrete-bar-chart', Ember.NVD3.DiscreteBarChart);
