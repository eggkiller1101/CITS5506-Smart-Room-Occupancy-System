let occupancyChart = null;

function initChart() {
  const ctx = document.getElementById('occupancyChart').getContext('2d');

  occupancyChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {
          label: 'Occupancy Count',
          data: [],
          borderColor: 'rgba(52, 152, 219, 1)',
          backgroundColor: 'rgba(52, 152, 219, 0.2)',
          tension: 0.2,
          fill: true,
          pointRadius: 4,
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: 'People in Room' },
        },
        x: {
          title: { display: true, text: 'Time' },
        },
      },
    },
  });
}

function updateOccupancyChart(data) {
  const times = data.map((entry) => entry.timestamp.slice(11, 16));
  const counts = data.map((entry) => entry.resulting_count);

  occupancyChart.data.labels = times;
  occupancyChart.data.datasets[0].data = counts;
  occupancyChart.update();
}

document.addEventListener('DOMContentLoaded', () => {
  // initialize the chart
  initChart();

  // page navigation
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.page-section');

  navItems.forEach((item) => {
    item.addEventListener('click', () => {
      navItems.forEach((i) => i.classList.remove('active'));
      item.classList.add('active');

      const target = item.getAttribute('data-target');
      sections.forEach((sec) => {
        sec.style.display = sec.id === target ? 'block' : 'none';

        // // if click the history page, load the real-time data to update the chart
        // if (target === 'history') {
        //     fetchOccupancyHistory(); // load chart data
        // }
      });
    });
  });

  // mock data for testing
  const mockData = [
    { timestamp: '2025-04-28T13:00:00Z', resulting_count: 3 },
    { timestamp: '2025-04-28T13:10:00Z', resulting_count: 5 },
    { timestamp: '2025-04-28T13:20:00Z', resulting_count: 8 },
    { timestamp: '2025-04-28T13:30:00Z', resulting_count: 6 },
    { timestamp: '2025-04-28T13:40:00Z', resulting_count: 10 },
  ];

  updateOccupancyChart(mockData);

  // real API call to fetch occupancy history
  //   function fetchOccupancyHistory() {
  //     fetch('/api/occupancy/history') // backend API endpoint
  //       .then(res => res.json())
  //       .then(data => {
  //         // assume return structure is { history: [ {timestamp: "...", resulting_count: ...}, ... ] }
  //         updateOccupancyChart(data.history);
  //       })
  //       .catch(err => {
  //         console.error('Failed to fetch history data:', err);
  //       });
  //   }
});
