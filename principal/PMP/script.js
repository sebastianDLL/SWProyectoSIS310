document
  .getElementById("inputForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    generateTable();
  });

function generateTable() {
  var inventarioInicial = parseInt(
    document.getElementById("inventarioInicial").value
  );
  var pronosticos = document
    .getElementById("pronosticos")
    .value.split(",")
    .map(Number);
  var nroPeriodos = parseInt(document.getElementById("nroPeriodos").value);
  var pedidos = document.getElementById("pedidos").value.split(",").map(Number);
  var cantidadPaquetes = parseInt(document.getElementById("cantidadPaquetes").value); // Obtener el número de paquetes desde el input

  var data = {
    Periodo: Array.from({ length: nroPeriodos }, (_, i) => i + 1),
    "Inventario Inicial": Array.from({ length: nroPeriodos }, (_, i) =>
      i === 0 ? inventarioInicial : null
    ),
    Pronóstico: pronosticos,
    Pedidos: pedidos,
    "MPS/PMP": Array.from({ length: nroPeriodos }, () => 0),
    "Inventario Final": Array.from({ length: nroPeriodos }, () => 0),
    DPP: Array.from({ length: nroPeriodos }, () => "-"),
  };

  for (var i = 0; i < nroPeriodos; i++) {
    var maxDemand = Math.max(data["Pronóstico"][i], data["Pedidos"][i]);
    if (
      (data["Inventario Inicial"][i] || data["Inventario Final"][i - 1]) <
      maxDemand
    ) {
      data["MPS/PMP"][i] = cantidadPaquetes;
    }
    var inventario =
      (data["Inventario Inicial"][i] || data["Inventario Final"][i - 1]) +
      data["MPS/PMP"][i] -
      maxDemand;
    data["Inventario Final"][i] = inventario;
    data["Inventario Inicial"][i + 1] = inventario;
  }

  // Calcular DPP después de calcular las otras filas
  for (var i = 0; i < nroPeriodos; i++) {
    if (data["MPS/PMP"][i] > 0) {
      if (i === nroPeriodos - 1 || data["MPS/PMP"][i + 1] === 0) {
        var dpp =
          data["MPS/PMP"][i] +
          (data["Inventario Inicial"][i] || data["Inventario Final"][i - 1]) -
          data["Pedidos"][i] -
          (data["Pedidos"][i + 1] || 0);
        data["DPP"][i] = dpp >= 0 ? dpp : "-";
      } else {
        var dpp =
          data["MPS/PMP"][i] +
          (data["Inventario Inicial"][i] || data["Inventario Final"][i - 1]) -
          data["Pedidos"][i];
        data["DPP"][i] = dpp >= 0 ? dpp : "-";
      }
    }
  }

  var resultContainer = document.getElementById("resultContainer");
  resultContainer.innerHTML = ""; // Limpiar resultados anteriores

  var table = document.createElement("table");
  var row = table.insertRow();
  for (var key in data) {
    var cell = row.insertCell();
    cell.innerText = key;
  }

  for (var i = 0; i < nroPeriodos; i++) {
    var row = table.insertRow();
    for (var key in data) {
      var cell = row.insertCell();
      cell.innerText = data[key][i] || "-";
    }
  }

  resultContainer.appendChild(table);
}

function guardarTabla() {
  var resultContainer = document.getElementById("resultContainer");
  var table = resultContainer.querySelector("table");

  html2canvas(table).then(function (canvas) {
    // Crea un enlace <a> para descargar la imagen
    var link = document.createElement("a");
    link.href = canvas.toDataURL();
    link.download = "tabla_mps.png";

    // Simula un clic en el enlace para iniciar la descarga
    link.click();
  });

  alert("Tabla guardada ");
}

function salir() {
  // Lógica para salir o cerrar la aplicación
  location.href = "../index.html";
}

function Mostrar() {
    location.href = "mostrar.html";
}
function Guardar() {
  var container = document.querySelector(".resultContainer");
  if (container === null) {
    console.error("No se encontró ningún elemento con clase 'container'");
    return;
  }

  html2canvas(container, {
    scrollY: -window.scrollY,
  }).then(function (canvas) {
    var imgData = canvas.toDataURL("image/png");

    // Convertir la imagen a un Blob
    var byteString = atob(imgData.split(",")[1]);
    var mimeString = imgData.split(",")[0].split(":")[1].split(";")[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ab], { type: mimeString });

    // Pedir al usuario que introduzca el nombre de la imagen
    var nombreImagen = prompt("Por favor, introduce el nombre para la imagen:");

    // Crear una referencia a 'imagesPMS/nombreImagen.png' en Firebase Storage
    var storageRef = firebase
      .storage()
      .ref("imagesPLANMAESTRO/" + nombreImagen + ".png");

    // Subir la imagen a Firebase Storage
    var uploadTask = storageRef.put(blob);

    uploadTask.on(
      "state_changed",
      function (snapshot) {
        // Observar los cambios en el estado de la subida
      },
      function (error) {
        // Manejar los errores
        console.error(error);
      },
      function () {
        // La subida se completó exitosamente
        alert("La imagen se guardo correctamente");
        console.log("La imagen se subió correctamente a Firebase Storage");
        var resultContainer = document.getElementById("resultContainer");
        var table = resultContainer.querySelector("table");

        html2canvas(table).then(function (canvas) {
          // Crea un enlace <a> para descargar la imagen
          var link = document.createElement("a");
          link.href = canvas.toDataURL();
          link.download = "tabla_mps.png";

          // Simula un clic en el enlace para iniciar la descarga
          link.click();
        });
      }
    );
  });
}
