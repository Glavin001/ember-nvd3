Ember.NVD3.LineWithFocus = Ember.NVD3.ChartComponent.extend({

  marginRight: 70,

  chartModel: function() {
    return nv.models.lineWithFocusChart();
  }.property(),

});

Ember.Handlebars.helper('nvd3-line-with-focus', Ember.NVD3.LineWithFocus);
