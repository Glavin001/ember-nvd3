Ember.NVD3.PieChart = Ember.NVD3.ChartComponent.extend({

  _chartModel: "pieChart",

  x: function(d,i) {
    return d.key;
  },
  y: function(d,i) {
    return d.y;
  },
  color: function() {
    return d3.scale.category10().range();
  }.property(),

  donut: false,

  pieStartAngle: function(d) {
    return d.startAngle/2 -Math.PI/2
  }.property(),
  pieEndAngle: function(d) {
    return d.endAngle/2 -Math.PI/2
  }.property(),

  customizeChart: function(chart) {
    console.log('customize pie chart');
    var self = this;
    // Basic
    chart.donut(self.get('donut'));
    chart.color(self.get('color'));
    // Pie
    chart.pie
    .startAngle(function(d) { return d.startAngle/2 -Math.PI/2 })
    .endAngle(function(d) { return d.endAngle/2 -Math.PI/2 });

    return chart;
  }

});

Ember.Handlebars.helper('nvd3-pie-chart', Ember.NVD3.PieChart);
