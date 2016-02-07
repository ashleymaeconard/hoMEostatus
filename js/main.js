var app = angular.module("app", ["firebase"]);

$(window).load(function() {

  var tempChart = c3.generate({
  	bindto: '#tempChart',
    data: {
      x: 'x',
      columns: [
        ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
        ['Temperature', 30, 50, 32, 74, 50, 42],
      ]
    },
    axis: {
      x: {
        type: 'timeseries',
        tick: {
          format: '%Y-%m-%d'
        }
      }
    }
  });

  setTimeout(function () {
    tempChart.load();
  }, 1000);

  var tempChart = c3.generate({
  	bindto: '#tempChart',
    data: {
      x: 'x',
      columns: [
        ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
        ['Temperature', 30, 50, 32, 74, 50, 42],
      ]
    },
    axis: {
      x: {
        type: 'timeseries',
        tick: {
          format: '%Y-%m-%d'
        }
      }
    }
  });

  setTimeout(function () {
    tempChart.load();
  }, 1000);

  var heartChart = c3.generate({
  	bindto: '#heartChart',
    data: {
      x: 'x',
      columns: [
        ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
        ['Heart Rate', 30, 50, 32, 74, 50, 42],
      ]
    },
    axis: {
      x: {
        type: 'timeseries',
        tick: {
          format: '%Y-%m-%d'
        }
      }
    }
  });

  setTimeout(function () {
    heartChart.load();
  }, 1000);

  var uvChart = c3.generate({
  	bindto: '#uvChart',
    data: {
      x: 'x',
      columns: [
        ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
        ['UV Rating', 30, 50, 32, 74, 50, 42],
      ]
    },
    axis: {
      x: {
        type: 'timeseries',
        tick: {
          format: '%Y-%m-%d'
        }
      }
    }
  });

  setTimeout(function () {
    uvChart.load();
  }, 1000);

});

