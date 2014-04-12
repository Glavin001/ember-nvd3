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
  templateName: "nvd3-chart",
  classNames: []
});

Ember.Handlebars.helper('nvd3-chart', Ember.NVD3.ChartComponent);


})();