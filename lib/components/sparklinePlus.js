Ember.NVD3.SparklinePlusComponent = Ember.NVD3.ChartComponent.extend({

  marginRight: 70,

  x: function(d,i) { return i },

  xTickFormat: function(d, i) {
    var data = this.get('data', d, i);
    return d3.time.format('%x')(new Date(data[d].x))
  },

  _chartModel: "sparklinePlus"

});

Ember.Handlebars.helper('nvd3-sparkline-plus', Ember.NVD3.SparklinePlusComponent);
