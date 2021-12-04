import Chart from "chart.js/auto";

function buildHystogram(valuesX, valuesY, canvas, displayName = "") {
  const ctx = canvas.getContext("2d");
  const chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: valuesX,
      datasets: [
        {
          label: displayName,
          data: valuesY,
          backgroundColor: "green",
        },
      ],
    },
    options: {
      scales: {
        xAxes: [
          {
            display: false,
            barPercentage: 1.3,
            ticks: {
              max: 3,
            },
          },
          {
            display: true,
            ticks: {
              autoSkip: false,
              max: 4,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}

function buildDotedField(valuesX, valuesY, canvas, displayName = "") {
  if (valuesX.length !== valuesY.length) return;
  const ctx = canvas.getContext("2d");
  for (let i = 0; i < valuesX.length; i++) {
    drawPoint(ctx, valuesX[i], valuesY[i]);
  }
}

function drawPoint(context, x, y, size = null, color = null) {
  if (color == null) {
    color = "#000";
  }
  if (size == null) {
    size = 1;
  }

  // to increase smoothing for numbers with decimal part
  var pointX = Math.round(x);
  var pointY = Math.round(y);

  context.beginPath();
  context.fillStyle = color;
  context.arc(pointX, pointY, size, 0 * Math.PI, 2 * Math.PI);
  context.fill();
}

export { buildHystogram, buildDotedField };
