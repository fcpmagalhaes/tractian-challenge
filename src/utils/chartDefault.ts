
export const donutChart = {
  chart: {
    type: 'solidgauge',
    width: 250,
    height: 250,
  },
  title: {
    text: 'Saúde',
    style: {
      fontSize: '16px'
    }
  },
  tooltip: {
    borderWidth: 0,
    backgroundColor: 'none',
    shadow: false,
    style: {
      fontSize: '10px'
    },
    valueSuffix: '%',
    pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}</span>',
    // positioner: function(labelWidth) {
    //   return {
    //     x: (this.chart.chartWidth - labelWidth) / 2,
    //     y: (this.chart.plotHeight / 2) + 15
    //   };
    // }
  },
  pane: {
    startAngle: 0,
    endAngle: 360,
    background: [{
      outerRadius: '112%',
      innerRadius: '88%',
      backgroundColor: '#BCDAF1',
      borderWidth: 0
    }]
  },
  yAxis: {
    min: 0,
    max: 100,
    lineWidth: 0,
    tickPositions: []
  },
  plotOptions: {
    solidgauge: {
      dataLabels: {
        enabled: false
      },
      linecap: 'round',
      stickyTracking: false,
      rounded: true
    }
  },
  series: [{
    name: 'Nível',
    data: [{
      color: '#3498db',
      radius: '112%',
      innerRadius: '88%',
      y: 0,
    }],
  }]
};

export const barChart = {
  chart: {
      type: 'bar',
  },
  title: {
    style: {
      fontSize: '16px'
    }
  },
  xAxis: {
      categories: ['Horas']
  },
  yAxis: {
      min: 0,
      title: {
          text: ''
      }
  },
  credits: {
    enabled: false
  },
  legend: {
      reversed: true
  },
  plotOptions: {
      series: {
          stacking: 'normal'
      }
  },
  series: [
    {
      name: 'Tempo Total de Atividade',
      data: [0],
      color: '#6AA5E7',
      index: 2
    },
    {
      name: 'Tempo Total de Coleta',
      data: [0],
      color: '#6C6DE3',
      index: 0
    }
  ]
}