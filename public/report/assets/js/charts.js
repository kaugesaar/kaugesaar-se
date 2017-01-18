google.charts.load('current', {packages: ['line','corechart','bar']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  // Define the chart to be drawn.
  lineChart();
  deviceChart();
}

function lineChart() {
  var arrayData = [['Year', 'Cost', 'Clicks']];

  for(var i = 0; i < 13; i++) {
    if(i == 12) {
      arrayData.push([
        '2016-' + 01,
        Math.random() * 10000,
        Math.random() * 1000
      ]);
    } else {
      arrayData.push([
        '2015-' + (i + 1),
        Math.random() * 10000,
        Math.random() * 1000
      ]);
    }
  }

  var data = new google.visualization.arrayToDataTable(arrayData);


  var options = {
    width: 820,
    height: 300,
    legend: { position: 'bottom'},
    series: {
      0: {
        color: '#8dc63f',
        axis: 'cost',
        pointSize: 5,
        lineWidth: 3,
        targetAxisIndex: 0
      },
      1: {
        color: '#f58026',
        axis: 'clicks',
        pointSize: 5,
        lineWidth: 3,
        targetAxisIndex: 1
      },
    },
  };

  var chart = new google.visualization.LineChart(document.getElementById('myChart'));
  chart.draw(data, options);
}

function deviceChart() {
  var data = google.visualization.arrayToDataTable([
    ['Device', 'Clicks per Device'],
    ['Dekstop', 980],
    ['Tablet', 280],
    ['Mobile', 760],
  ]);

  var options = {
    width: 400,
    height: 400,
    legend: 'bottom',
    backgroundColor: 'transparent',
    is3D: true,
    slices: {
      0: {
        color: '#8dc63f',
        offset: 0.1
      },
      1: {
        color: '#f58026',
        offset: 0
      },
      2: {
        color: '#455560',
        offset: 0
      }
    }
  };

  var chart = new google.visualization.PieChart(document.getElementById('devicechart'));
  chart.draw(data, options);

  var optionsTwo = {};
  optionsTwo = options;
  optionsTwo.slices[0].color = '#d3e9b5';
  optionsTwo.slices[1].color = '#fcd6b8';
  optionsTwo.slices[2].color = '#8fa2af';


  var lchart = new google.visualization.PieChart(document.getElementById('ldevicechart'));
  lchart.draw(data, optionsTwo);
}
