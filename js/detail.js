import {
  buildWeekData,
  buildAccomplishedData,
  buildForescastData,
  buildAnualData,
  buildOrdersData,
  buildQuotationData,
  buildSaleReturnData,
} from "./functions/buildData.js";

import {
  drawWeekGraph,
  drawAccomplishedGraph,
  drawForecastGraph,
  drawAnualGraph,
  drawOrdersGraph,
  drawQuotationsGraph,
  drawSaleReturnGraph,
} from "./functions/drawGraph.js";

$(document).ready(function () {
  getData();
  return;
});

function getData() {
  let id = new URLSearchParams(window.location.search).get("id");
  fetch(`http://localhost:3000/salespersons/${id}`)
    .then((response) => response.json())
    .then((data) => {
      updatePageName(data.infoResult.data[0].slpName.split(" ")[0]);
      drawWeekGraph(buildWeekData(data));
      drawAccomplishedGraph(buildAccomplishedData(data));
      drawForecastGraph(buildForescastData(data));
      drawAnualGraph(buildAnualData(data));
      drawOrdersGraph(buildOrdersData(data));
      drawQuotationsGraph(buildQuotationData(data));
      drawSaleReturnGraph(buildSaleReturnData(data));
    });
}

function updatePageName(name) {
  document.head.querySelector("title").innerText = `${name}'s Report`;
  document.getElementById("spName").innerText = `${name}'s Dashboard`;
}
