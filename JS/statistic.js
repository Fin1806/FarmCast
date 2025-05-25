const ctx = document.getElementById('agriChart').getContext('2d');

new Chart(ctx, {
  type: 'line',
  data: {
    labels: Array.from({ length: 12 }, (_, i) => `W${i + 1}`),
    datasets: [
      {
        label: 'Paddy',
        data: [5, 4, 6, 3, 7, 4, 6, 7, 9, 11, 13, 15],
        borderColor: '#2ca25f',
        backgroundColor: 'transparent',
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 0
      },
      {
        label: 'Corn',
        data: [6, 5, 4, 7, 3, 6, 8, 10, 9, 10, 12, 14],
        borderColor: '#006d2c',
        backgroundColor: 'transparent',
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 0
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: { display: false },
      y: { display: false }
    },
    elements: {
      point: {
        radius: (ctx) => [5, 8].includes(ctx.dataIndex) ? 6 : 0,
        backgroundColor: 'orange'
      }
    }
  }
});

const saleCtx = document.getElementById('saleChart').getContext('2d');

new Chart(saleCtx, {
  type: 'line',
  data: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
    datasets: [
      {
        label: 'This Month',
        data: [2.1, 3.2, 4.2, 3.5, 3.1],
        borderColor: '#003d1f',
        backgroundColor: 'rgba(0, 61, 31, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#003d1f',
        pointRadius: 5,
        pointHoverRadius: 6,
        borderWidth: 3
      },
      {
        label: 'Last Month',
        data: [1.5, 3.0, 2.5, 3.4, 4.1],
        borderColor: '#1b8a3d',
        borderDash: [5, 5],
        backgroundColor: 'transparent',
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => `${ctx.raw.toFixed(1)}mil`
        }
      }
    },
    scales: {
      y: {
        min: 1,
        max: 5,
        ticks: {
          callback: val => `${val}mil`
        },
        grid: { drawBorder: false }
      },
      x: {
        grid: { display: false }
      }
    }
  }
});

document.getElementById('monthSelect').addEventListener('change', function () {
    const selectedMonth = this.value;
    console.log("Month selected:", selectedMonth);
  });

  
  const monthlyData = {
    January: [2.1, 3.2, 4.2, 3.5, 3.1],
    February: [1.8, 2.5, 3.0, 2.9, 3.3],
    March: [3.0, 2.7, 3.5, 3.8, 4.1]
  };
  
  document.getElementById('monthSelect').addEventListener('change', function () {
    const month = this.value;
    saleChart.data.datasets[0].data = monthlyData[month] || [];
    saleChart.update();
  });

  const donutCtx = document.getElementById('donutChart').getContext('2d');

  new Chart(donutCtx, {
    type: 'doughnut',
    data: {
      labels: ['Paddy', 'Corn', 'Tomato'],
      datasets: [{
        data: [8800000, 2800000, 1500000],
        backgroundColor: ['#003d1f', '#1b8a3d', '#6effb1'],
        borderWidth: 0
      }]
    },
    options: {
      cutout: '70%',
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => `${ctx.label}: Rp${ctx.raw.toLocaleString('id-ID')}`
          }
        }
      }
    }
  });