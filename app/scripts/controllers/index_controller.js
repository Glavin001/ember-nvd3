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
        self.set('lineChartData', testData());



        function sinAndCos() {
          var sin = [],
              cos = [];

          for (var i = 0; i < 100; i++) {
            sin.push({x: i, y: Math.sin(i/10)});
            cos.push({x: i, y: .5 * Math.cos(i/10)});
          }

          return [
            {
              values: sin,
              key: "Sine Wave",
              color: "#ff7f0e"
            },
            {
              values: cos,
              key: "Cosine Wave",
              color: "#2ca02c"
            }
          ];
        }
        function sinData() {
          var sin = [];

          for (var i = 0; i < 100; i++) {
            sin.push({x: i, y: Math.sin(i/10)});
          }

          return [
            {
              values: sin,
              key: "Sine Wave",
              color: "#ff7f0e"
            }
          ];
        }
        self.set('historicalBarChartData', sinData());


        var historicalBarChart = [
          {
            key: "Cumulative Return",
            values: [
              {
                "label" : "A" ,
                "value" : 29.765957771107
              } ,
              {
                "label" : "B" ,
                "value" : 0
              } ,
              {
                "label" : "C" ,
                "value" : 32.807804682612
              } ,
              {
                "label" : "D" ,
                "value" : 196.45946739256
              } ,
              {
                "label" : "E" ,
                "value" : 0.19434030906893
              } ,
              {
                "label" : "F" ,
                "value" : 98.079782601442
              } ,
              {
                "label" : "G" ,
                "value" : 13.925743130903
              } ,
              {
                "label" : "H" ,
                "value" : 5.1387322875705
              }
            ]
          }
        ];
        self.set('discreteBarChartData', historicalBarChart);



        var testdata = [
          {
            key: "One",
            y: 5
          },
          {
            key: "Two",
            y: 2
          },
          {
            key: "Three",
            y: 9
          },
          {
            key: "Four",
            y: 7
          },
          {
            key: "Five",
            y: 4
          },
          {
            key: "Six",
            y: 3
          },
          {
            key: "Seven",
            y: .5
          }
        ];
        self.set('pieChartData', testdata);
        
    },
    refresh: function() {
      this.send('genData');
    }
  }

});
