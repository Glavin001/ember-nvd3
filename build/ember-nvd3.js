(function() {

Ember.TEMPLATES["nvd3-chart"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashContexts, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("Hello Visualizers!!!!!\n\n<svg ");
  hashContexts = {'width': depth0,'height': depth0};
  hashTypes = {'width': "STRING",'height': "STRING"};
  options = {hash:{
    'width': ("outerWidth"),
    'height': ("outerHeight")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || depth0['bind-attr']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">\n  <g class=\"chart-viewport\" ");
  hashContexts = {'transform': depth0};
  hashTypes = {'transform': "STRING"};
  options = {hash:{
    'transform': ("transformViewport")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || depth0['bind-attr']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push("></g>\n</svg>\n");
  return buffer;
  
});

})();

(function() {

Ember.NVD3 = Ember.Namespace.create();
Ember.NVD3.VERSION = '0.0.1';

Ember.libraries.register('Ember NVD3', Ember.NVD3.VERSION);


})();

(function() {

Ember.NVD3.ChartComponent = Ember.Component.extend({
  tagName: 'svg',
  classNames: ['ember-nvd3'],

  data: null,
  chart: null,

  marginTop: 0,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0,

  showControl: true,
  showLegend: true,

  showXAxis: true,
  showYAxis: true,

  init: function() {
    this._super();
  },

  xTickFormat: false,

  xAxisTickFormat: d3.format(',f'),
  x2AxisTickFormat: d3.format(',f'),
  yAxisTickFormat: d3.format(',.2f'),
  y2AxisTickFormat: d3.format(',.2f'),

  chartModel: function() {
    return nv.models.line();
  }.property(),

  didInsertElement: function() {
    var self = this;
    var $el = self.$();
    var el = $el.get(0);
    nv.addGraph(function() {
      var chart = self.get('chartModel');
      self.set('chart', chart);
      self.get('updateChart').apply(self, [el]);
      return chart;
    });
  },

  observeData: function() {
    this.get('updateChart').apply(this, [this.get('element')]);
  }.observes('data'),


  updateChart: function(el) {

    var self = this;
    var data = self.get('data');
    var chart = self.get('chart');

    chart
      .margin({
        top: self.get('marginTop'),
        right: self.get('marginRight'),
        bottom: self.get('marginBottom'),
        left: self.get('marginLeft')
      })
      .options({
        showControls: self.get('showControls'),
        showLegend: self.get('showLegend')
      })
      .x(function(d,i) {
        return i;
      })

    if (!!chart.xTickFormat && !!self.get('xTickFormat')) {
      chart.xTickFormat(function() {
        return self.get('xTickFormat').apply(self, arguments);
      });
    }
    if (chart.showXAxis) {
      chart.showXAxis(self.get('showXAxis'))
    }
    if (chart.showYAxis) {
      chart.showYAxis(self.get('showYAxis'))
    }
    if (chart.showLegend) {
      chart.showLegend(self.get('showLegend'))
    }
    if (chart.xAxis) {
      chart.xAxis.tickFormat(function() {
        return self.get('xAxisTickFormat').apply(self, arguments);
      });
    }
    if (chart.x2Axis) {
      chart.xAxis.tickFormat(function() {
        return self.get('x2AxisTickFormat').apply(self, arguments);
      });
    }
    if (chart.yAxis) {
      chart.yAxis.tickFormat(function() {
        return self.get('yAxisTickFormat').apply(self, arguments);
      });
    }
    if (chart.y2Axis) {
      chart.y2Axis.tickFormat(function() {
        return self.get('y2AxisTickFormat').apply(self, arguments);
      });
    }

    d3.select(el)
        .datum(data)
        .transition()
        .duration(250)
        .call(chart);

    self.set('chart', chart);

  }

});

// Ember.Handlebars.helper('nvd3-chart', Ember.NVD3.ChartComponent);


})();

(function() {

Ember.NVD3.LineWithFocus = Ember.NVD3.ChartComponent.extend({

  marginRight: 70,

  chartModel: function() {
    return nv.models.lineWithFocusChart();
  }.property(),

});

Ember.Handlebars.helper('nvd3-line-with-focus', Ember.NVD3.LineWithFocus);


})();

(function() {

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


})();