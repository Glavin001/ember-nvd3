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
  _chart: null,

  marginTop: null,
  marginRight: null,
  marginBottom: null,
  marginLeft: null,

  showControl: true,
  showLegend: true,

  showXAxis: true,
  showYAxis: true,

  xTickFormat: null,

  xAxisTickFormat: null,
  x2AxisTickFormat: null,
  yAxisTickFormat: null,
  y2AxisTickFormat: null,

  x: null,
  y: null,

  _chartModel: function() {
    throw new Error('Must change _chartModel in subclass.');
  }.property(),

  init: function() {
    this._super();
  },

  chartModel: function() {
    return nv.models[this.get('_chartModel')]();
  }.property("_chartModel"),

  margin: function() {
    var self = this;
    var margins = {};
    if (self.get('marginTop'))
      margins.top = self.get('marginTop');
    if (self.get('marginRight'))
      margins.right = self.get('marginRight');
    if (self.get('marginBottom'))
      margins.bottom = self.get('marginBottom');
    if (self.get('marginLeft'))
      margins.left = self.get('marginLeft');
    return margins;
  }.property('marginTop', 'marginRight','marginBottom','marginLeft'),

  options: function() {
    var self = this;
    return {
      showControls: self.get('showControls'),
      showLegend: self.get('showLegend')
    };
  }.property('showControls', 'showLegend'),

  chart: function() {
    var self = this;
    var chart = self.get('_chart');
    if (!chart) {
      chart = self.get('chartModel')
    }

    chart
      .margin(self.get('margin'))
      .options(self.get('options'));

    if (self.get('x')) {
      chart.x(self.get('x'));
    }
    if (self.get('y')) {
      chart.y(self.get('y'))
    }

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
    if (chart.xAxis && self.get('xAxisTickFormat')) {
      chart.xAxis.tickFormat(function() {
        return self.get('xAxisTickFormat').apply(self, arguments);
      });
    }
    if (chart.x2Axis && self.get('x2AxisTickFormat')) {
      chart.xAxis.tickFormat(function() {
        return self.get('x2AxisTickFormat').apply(self, arguments);
      });
    }
    if (chart.yAxis && self.get('yAxisTickFormat')) {
      chart.yAxis.tickFormat(function() {
        return self.get('yAxisTickFormat').apply(self, arguments);
      });
    }
    if (chart.y2Axis && self.get('y2AxisTickFormat')) {
      chart.y2Axis.tickFormat(function() {
        return self.get('y2AxisTickFormat').apply(self, arguments);
      });
    }

    return self.get('customizeChart').apply(self, [chart]);
  }.property('chartModel', 'margin', 'options'),

  customizeChart: function(chart) {
    return chart;
  },

  didInsertElement: function() {
    var self = this;
    var $el = self.$();
    var el = $el.get(0);
    console.log(self, $el, el);
    nv.addGraph(function() {
      var chart = self.get('chart');

      return chart;
    });
  },
  willDestroyElement: function() {

  },

  updateChart: function() {

    var self = this;
    var el = self.get('element');
    var data = self.get('data');
    var chart = self.get('chart');

    d3.select(el)
        .datum(data)
        .transition()
        .duration(250)
        .call(chart);

    self.set('_chart', chart);

  }.observes('data','chart').on('didInsertElement')

});

// Ember.Handlebars.helper('nvd3-chart', Ember.NVD3.ChartComponent);


})();

(function() {

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


})();

(function() {

Ember.NVD3.HistoricalBarChart = Ember.NVD3.ChartComponent.extend({

  marginLeft: 100,
  marginBottom: 100,

  _chartModel: "historicalBarChart",

  xAxisTickFormat: d3.format(',.1f'),
  yAxisTickFormat: d3.format(',.2f')

});

Ember.Handlebars.helper('nvd3-historical-bar-chart', Ember.NVD3.HistoricalBarChart);


})();

(function() {

Ember.NVD3.LineWithFocusChart = Ember.NVD3.ChartComponent.extend({

  marginRight: 70,

  _chartModel: "lineWithFocusChart"

});

Ember.Handlebars.helper('nvd3-line-with-focus-chart', Ember.NVD3.LineWithFocusChart);


})();

(function() {

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


})();

(function() {

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


})();