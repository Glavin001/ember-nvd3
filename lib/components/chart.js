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
    if (self.get('marginTop') !== null)
      margins.top = self.get('marginTop');
    if (self.get('marginRight') !== null)
      margins.right = self.get('marginRight');
    if (self.get('marginBottom') !== null)
      margins.bottom = self.get('marginBottom');
    if (self.get('marginLeft') !== null)
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
