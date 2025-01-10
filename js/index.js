$(document).ready(function () {
  $.fn.dataTable.ext.type.order["currency-pre"] = function (data) {
    return parseFloat(data.replace(/[₡,]/g, ""));
  };

  spsTableInit();
  getData();
});

function navigateToDetail(spId) {
  window.location.href = `detail.html?id=${spId}`;
}

// Función para formatear un número como moneda
function formatCurrency(number) {
  // Asegurarse de que el número sea válido
  if (isNaN(number)) {
    throw new Error("El valor proporcionado no es un número válido.");
  }

  // Convertir el número a formato con separadores de miles y decimales
  return (
    "₡" +
    number
      .toFixed(2) // Asegurarse de tener siempre dos decimales
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") // Separar los miles con comas
      .replace(".", ".")
  ); // Asegurarse de usar punto para decimales (opcional, ya está así por defecto en toFixed)
}

function formatPercentage(number) {
  if (isNaN(number)) {
    throw new Error("El valor proporcionado no es un número válido.");
  } else if (number === Infinity) {
    return "NA";
  }
  return number.toFixed(2) + "%";
}

function getData() {
  fetch("http://localhost:3000/salespersons")
    .then((response) => response.json())
    .then((data) => {
      spsTableFill(spsDataBuild(data));
    });
}

function spsDataBuild(data) {
  let spsData = [];
  data.forEach((spInfo) => {
    let row = [];
    row.push(spInfo.id);
    let generalData = spInfo.infoResult.data[0];
    let accomplished = (generalData.sale / generalData.budget) * 100;
    row.push(generalData.slpName);
    row.push(formatCurrency(generalData.sale));
    row.push(formatCurrency(generalData.budget));
    row.push(formatCurrency(generalData.sale - generalData.budget));
    row.push(
      `<span class="bg-${
        accomplished >= 100
          ? "success"
          : accomplished >= 80
          ? "warning"
          : "danger"
      }">${formatPercentage(accomplished)}</span>`
    );
    row.push(
      `<button class="btn btn-secondary" onclick="navigateToDetail(${spInfo.id})"><i class="fa-solid fa-arrow-right"></i></button>`
    );

    spsData.push(row);
  });

  return spsData;
}

function spsTableFill(spsData) {
  let spsTable = $("#spsTable").DataTable();
  spsData.forEach((sp) => {
    spsTable.row.add(sp);
  });
  spsTable.draw();
}

function spsTableInit() {
  new DataTable("#spsTable", {
    select: true,
    paging: true,
    bSort: true,
    pageLength: 10,
    dom: "frtip",

    columns: [
      null,
      null,
      { type: "currency" },
      { type: "currency" },
      { type: "currency" },
      null,
      { orderable: false },
    ],

    language: {
      url: "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json",
    },
  });
}
