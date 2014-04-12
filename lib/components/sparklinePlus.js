Ember.NVD3.SparklinePlusComponent = Ember.NVD3.ChartComponent.extend({

  marginRight: 70,

  xTickFormat: function(d) {
    var data = this.get('data');
    console.log(d, data);
    return d3.time.format('%x')(new Date(data[d].x))
  },

  chartModel: function() {
    return nv.models.sparklinePlus();
  }.property(),

});

Ember.Handlebars.helper('nvd3-sparkline-plus', Ember.NVD3.SparklinePlusComponent);
