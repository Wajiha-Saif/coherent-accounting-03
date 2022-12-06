import { $themeColors } from '@themeConfig'

// colors
const chartColors = {
  column: {
    series1: '#826af9',
    series2: '#d2b0ff',
    bg: '#f8d3ff',
  },
  success: {
    shade_100: '#7eefc7',
    shade_200: '#06774f',
  },
  donut: {
    series1: '#ffe700',
    series2: '#00d4bd',
    series3: '#826bf8',
    series4: '#2b9bf4',
    series5: '#FFA1A1',
  },
  area: {
    series3: '#a4f8cd',
    series2: '#60f2ca',
    series1: '#2bdac7',
  },
}

export default {
  columnChart: {
    series: [
      {
        name: 'Invoices',
        data: [90, 120, 55, 100, 80, 125, 175, 70, 88, 180],
      },
      {
        name: 'Vat Reports',
        data: [85, 100, 30, 40, 95, 90, 30, 110, 62, 20],
      },
    ],
    chartOptions: {
      chart: {
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      colors: [chartColors.column.series1, chartColors.column.series2],
      plotOptions: {
        bar: {
          columnWidth: '15%',
          colors: {
            backgroundBarColors: [
              chartColors.column.bg,
              chartColors.column.bg,
              chartColors.column.bg,
              chartColors.column.bg,
              chartColors.column.bg,
            ],
            backgroundBarRadius: 10,
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: true,
        position: 'top',
        fontSize: '14px',
        fontFamily: 'Montserrat',
        horizontalAlign: 'left',
      },
      stroke: {
        show: true,
        colors: ['transparent'],
      },
      grid: {
        xaxis: {
          lines: {
            show: true,
          },
        },
      },
      xaxis: {
        categories: ['7/12', '8/12', '9/12', '10/12', '11/12', '12/12', '13/12', '14/12', '15/12', '16/12'],
      },
      yaxis: {
        // opposite: isRtl,
      },
      fill: {
        opacity: 1,
      },
    },
  }
}
