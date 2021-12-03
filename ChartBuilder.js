export function BuildHystogram(valuesX, valuesY, canvas, displayName = "") {
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

export function BuildDotedField() {}
