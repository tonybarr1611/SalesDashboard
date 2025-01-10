function drawWeekGraph(data) {
  // Extract data
  const weeks = Object.keys(data.weeks);
  const budgets = weeks.map((week) => data.weeks[week].budget / 1_000_000);
  const sales = weeks.map((week) => data.weeks[week].sale / 1_000_000);
  const lastYears = weeks.map((week) => data.weeks[week].lastYear / 1_000_000);
  const lastMonths = weeks.map(
    (week) => data.weeks[week].lastMonth / 1_000_000
  );

  //   Get chart container
  const chartDom = document.getElementById("weekGraph");
  const chart = echarts.init(chartDom);

  //   Set some important options
  const option = {
    // Hover tooltip
    tooltip: {
      trigger: "axis",
      formatter: (params) => {
        let tooltip = `<strong>${params[0].axisValueLabel}</strong><br>`;
        params.forEach((item) => {
          tooltip += `${item.marker} ${item.seriesName}: ₡${(
            item.value * 1_000_000
          ).toLocaleString()}<br>`;
        });
        return tooltip;
      },
    },
    // Bar columns
    legend: {
      data: ["Budget", "Sold", "Last year", "Last month"],
      textStyle: { color: "#666" },
    },
    // Weeks
    xAxis: {
      type: "category",
      data: weeks.map((week) => `Week ${week}`),
      axisLine: { lineStyle: { color: "#ccc" } },
      axisLabel: { color: "#666" },
    },
    yAxis: {
      type: "value",
      axisLine: { lineStyle: { color: "#ccc" } },
      axisLabel: { formatter: (value) => `${value}M` },
    },
    series: [
      {
        name: "Budget",
        type: "bar",
        data: budgets,
        itemStyle: { color: "#FF2D68" },
      },
      {
        name: "Sold",
        type: "bar",
        data: sales,
        itemStyle: { color: "#27D699" },
      },
      {
        name: "Last year",
        type: "bar",
        data: lastYears,
        itemStyle: { color: "#6F6F6F" },
      },
      {
        name: "Last month",
        type: "bar",
        data: lastMonths,
        itemStyle: { color: "#8E8E8E" },
      },
    ],
  };

  // Render chart
  chart.setOption(option);
  chart.resize();
  window.addEventListener("resize", () => chart.resize());

  //   Update summary
  document.getElementById(
    "totalSales"
  ).innerText = `₡${data.summary.sale.toLocaleString()}`;
  document.getElementById(
    "currentBudget"
  ).innerText = `₡${data.summary.budget.toLocaleString()}`;
  document.getElementById(
    "difference"
  ).innerText = `₡${data.summary.diff.toLocaleString()}`;
}

function drawAccomplishedGraph(data) {
  // Extract data
  const accomplished = data.accomplished;

  // Get chart container
  const chartDom = document.getElementById("accomplishedGraph");
  const chart = echarts.init(chartDom);

  // Set some important options
  const option = {
    series: [
      {
        type: "pie",
        radius: ["65%", "70%"],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: "center",
          formatter: () => `${accomplished.toFixed(2)}%`,
          fontSize: 24, // Increase font size for the center label
          fontWeight: "bold", // Make the font bold
          color: "#FF2565", // Optional: Set a color for better visibility
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            value: accomplished,
            name: "Accomplished",
            itemStyle: { color: "#27D699" },
          },
          {
            value: 100 - accomplished,
            name: "Remaining",
            itemStyle: { color: "#FF2565" },
          },
        ],
      },
    ],
  };

  // Render chart
  chart.setOption(option);
  chart.resize();
  window.addEventListener("resize", () => chart.resize());
}

function drawForecastGraph(data) {
  // Extract data
  const forecastSale = data.forecastSale;
  const forecastPercent = data.forecastPercent;

  // Get chart container
  const chartDom = document.getElementById("forecastGraph");
  const chart = echarts.init(chartDom);

  // Set some important options
  const option = {
    series: [
      {
        type: "pie",
        radius: ["65%", "70%"],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: "center",
          formatter: () => `${forecastPercent.toFixed(2)}%`,
          fontSize: 24, // Increase font size for the center label
          fontWeight: "bold", // Make the font bold
          color: "#ccc", // Optional: Set a color for better visibility
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "28",
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            value: forecastSale,
            name: "Forecast",
            itemStyle: { color: "#ccc" },
          },
          {
            value: 100 - forecastSale,
            name: "Remaining",
            itemStyle: { color: "#FF2565" },
          },
        ],
      },
    ],
  };

  // Render chart
  chart.setOption(option);
  chart.resize();
  window.addEventListener("resize", () => chart.resize());

  //   Update summary
  document.getElementById(
    "forecastAmmount"
  ).innerText = `₡${forecastSale.toLocaleString()}`;
}

function drawAnualGraph(data) {
  document.getElementById(
    "anualSale"
  ).innerText = `₡${data.anualSale.toLocaleString()}`;
  document.getElementById(
    "anualBudget"
  ).innerText = `₡${data.anualBudget.toLocaleString()}`;
  document.getElementById(
    "anualPercent"
  ).innerText = `${data.anualPercent.toFixed(2)}%`;
}

function drawOrdersGraph(data) {
  document.getElementById("orders").innerText =
    "₡" + data.orderSale.toLocaleString();
}

function drawQuotationsGraph(data) {
  document.getElementById("quotations").innerText =
    "₡" + data.quotationSale.toLocaleString();
}

function drawSaleReturnGraph(data) {
  document.getElementById(
    "billed"
  ).innerText = `₡${data.billed.toLocaleString()}`;
  document.getElementById(
    "returned"
  ).innerText = `₡${data.returned.toLocaleString()}`;
  document.getElementById(
    "returnPercent"
  ).innerText = `${data.returnPercent.toFixed(2)}%`;
}

export {
  drawWeekGraph,
  drawAccomplishedGraph,
  drawForecastGraph,
  drawAnualGraph,
  drawOrdersGraph,
  drawQuotationsGraph,
  drawSaleReturnGraph,
};
