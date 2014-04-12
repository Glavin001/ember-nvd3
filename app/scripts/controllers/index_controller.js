EmberNvd3.IndexController = Ember.ArrayController.extend({

  init: function() {
    console.log(this);
    this.send('genData');
  },

  sparklinePlusData: function() {
    return null;
  }.property(),

  actions: {
    genData: function() {
        var self = this;

        function volatileChart(startPrice, volatility, numPoints) {
             var rval =  [];
             var now =+new Date();
             numPoints = numPoints || 100;
             for(var i = 1; i < numPoints; i++) {

                rval.push({x: now + i * 1000 * 60 * 60 * 24, y: startPrice});
                var rnd = Math.random();
                var changePct = 2 * volatility * rnd;
                if ( changePct > volatility) {
                   changePct -= (2*volatility);
                }
                startPrice = startPrice + startPrice * changePct;
             }
             return rval;
        }
        self.set('sparklinePlusData', volatileChart(25.0, 0.09,30));

        function stream_index(d, i) {
          return {x: i, y: Math.max(0, d)};
        }
        function stream_layers(n, m, o) {
          if (arguments.length < 3) o = 0;
          function bump(a) {
            var x = 1 / (.1 + Math.random()),
                y = 2 * Math.random() - .5,
                z = 10 / (.1 + Math.random());
            for (var i = 0; i < m; i++) {
              var w = (i / m - y) * z;
              a[i] += x * Math.exp(-w * w);
            }
          }
          return d3.range(n).map(function() {
              var a = [], i;
              for (i = 0; i < m; i++) a[i] = o + o * Math.random();
              for (i = 0; i < 5; i++) bump(a);
              return a.map(stream_index);
            });
        } 
        function testData() {
          return stream_layers(3,128,.1).map(function(data, i) {
            return {
              key: 'Stream' + i,
              values: data
            };
          });
        }
        self.set('lineData', testData());

    },
    refresh: function() {
      this.send('genData');
    }
  }

});
