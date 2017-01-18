Function.prototype.bind = Function.prototype.bind || function (thisp) {
    var fn = this;
    return function () {
        return fn.apply(thisp, arguments);
    };
};

var queue = [];
google.load("visualization", "1", {packages: ['corechart']});
google.setOnLoadCallback(jobQueue);
//window.setTimeout(jobQueue,3500);

function jobQueue() {
  console.log('jobs');
  queue.forEach(function(job){
    job[0](job[1],job[2]);
  });
}


var createLineChart = function(ctx, data, options) {
  ctx.canvas.width = 600;
  ctx.canvas.height = 350;

  var options = options || {};
  var data = {
    labels :[1,2,3,4,5,6,7,8,9,10,11,12,13],
    datasets:[{
      label: 'Clicks',
      data: [5130,4045,4566,3231,5456,4565,4565,5546,4552,5453,5213,4113,4215],
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      yAxisID: 'y-axis-0'
    },{
      label: 'Impressions',
      data: [50130,40450,45566,32031,65456,40565,49565,55456,55201,65453,45213,44113,44215],
      backgroundColor: "rgba(0,0,0,0.4)",
      borderColor: "rgba(0,0,0,1)",
      yAxisID: 'y-axis-1'
    }]
  };

  return new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
      scales: {
        yAxes: [{
          position: "left",
          "id": "y-axis-0"
        }, {
          position: "right",
          "id": "y-axis-1"
        }]
      }
    }
  });
};

var lineChart = function(data, elementId) {
  if(typeof google.visualization === 'undefined') {
    console.log(true);
    queue.push([lineChart, data, elementId]);
  } else {
    var chart = new google.visualization.LineChart(document.getElementById(elementId));
    var options = {
      width: 820,
      height: 300,
      legend: { position: 'bottom'},
      series: {
        0: {
          color: '#8dc63f',
          axis: data[0][1],
          pointSize: 5,
          lineWidth: 3,
          targetAxisIndex: 0
        },
        1: {
          color: '#f58026',
          axis: data[0][2],
          pointSize: 5,
          lineWidth: 3,
          targetAxisIndex: 1
        },
      },
      vAxes: {
        0: {title: data[0][1]},
        1: {title: data[0][2]}
      }
    };
    chart.draw(new google.visualization.arrayToDataTable(data), options);
  }


};

var pieChart = function(data, elementId) {
  if(typeof google.visualization === 'undefined') {
    queue.push([pieChart, data, elementId]);
  } else {
    var chart = new google.visualization.PieChart(document.getElementById(elementId));
    var options = {
      width: 780,
      height: 280,
      legend: 'right',
      backgroundColor: 'transparent',
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
    chart.draw(new google.visualization.arrayToDataTable(data), options);
  }
};

var drawChart = {
  line: lineChart,
  pie: pieChart
};
