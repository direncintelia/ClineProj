const clickButton = document.getElementById('clickButton');
const scoreSpan = document.getElementById('score');
const timeBetweenClicksSpan = document.getElementById('timeBetweenClicks');
const clickChartCanvas = document.getElementById('clickChart').getContext('2d');
let score = 0;
let lastClickTime = 0;
const timeDiffs = [];
let firstClick = true;

const clickChart = new Chart(clickChartCanvas, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Time Between Clicks (ms)',
      data: timeDiffs,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

clickButton.addEventListener('click', () => {
  const now = Date.now();
  let timeDiff = 0;
  if (!firstClick) {
    timeDiff = now - lastClickTime;
    timeBetweenClicksSpan.textContent = timeDiff;

    if (timeDiff >= 900 && timeDiff <= 1100) {
      score++;
      scoreSpan.textContent = score;
    }

    timeDiffs.push(timeDiff);
    clickChart.data.labels.push(timeDiffs.length);
    clickChart.update();
  } else {
    firstClick = false;
    timeBetweenClicksSpan.textContent = "N/A";
  }
  lastClickTime = now;
});
