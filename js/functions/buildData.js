function buildWeekData(data) {
  let weekData = {};
  let generalData = data.infoResult.data[0];
  let accData = {
    budget: 0,
    sale: 0,
    lastYear: 0,
    lastMonth: 0,
  };
  data.weekResult.data.forEach((week) => {
    let weight = week.weekWeight / 100;
    weekData[week.week] = {
      budget: accData.budget + generalData.budget * weight,
      sale: accData.sale + week.sale,
      lastYear: accData.lastYear + generalData.pastYearSale * weight,
      lastMonth: accData.lastMonth + generalData.pastMonthSale * weight,
    };
    accData.budget += generalData.budget * weight;
    accData.sale += week.sale;
    accData.lastYear += generalData.pastYearSale * weight;
    accData.lastMonth += generalData.pastMonthSale * weight;
  });

  return {
    weeks: weekData,
    summary: {
      sale: accData.sale,
      budget: generalData.budget,
      diff: accData.sale - generalData.budget,
    },
  };
}

function buildAccomplishedData(data) {
  let generalData = data.infoResult.data[0];
  return { accomplished: (generalData.sale / generalData.budget) * 100 };
}

function buildForescastData(data) {
  let generalData = data.infoResult.data[0];
  let forecastSold = (100 * generalData.sale) / generalData.monthAdvance;
  return {
    forecastSale: forecastSold,
    forecastPercent: (forecastSold / generalData.budget) * 100,
  };
}

function buildAnualData(data) {
  let generalData = data.infoResult.data[0];
  return {
    anualSale: generalData.yearSale,
    anualBudget: generalData.yearBudget,
    anualPercent: (generalData.yearSale / generalData.yearBudget) * 100,
  };
}

function buildOrdersData(data) {
  let generalData = data.infoResult.data[0];
  return {
    orderSale: generalData.salesOrders,
  };
}

function buildQuotationData(data) {
  let generalData = data.infoResult.data[0];
  return {
    quotationSale: generalData.quotations,
  };
}

function buildSaleReturnData(data) {
  let generalData = data.infoResult.data[0];
  return {
    billed: generalData.sale,
    returned: generalData.creditNotes,
    returnPercent: (generalData.creditNotes / generalData.sale) * 100,
  };
}

export {
  buildWeekData,
  buildAccomplishedData,
  buildForescastData,
  buildAnualData,
  buildOrdersData,
  buildQuotationData,
  buildSaleReturnData,
};
