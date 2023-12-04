function menu() {
  location.href = "../inicio/index.html";
}

var myChart;
var bandera = 0;

document
  .getElementById("inputForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Obtener los datos de entrada del usuario
    var demanda = document
      .getElementById("demanda")
      .value.split(",")
      .map(Number);
    // Calcular la suma de los valores de demanda y los cuadrados de los índices
    var sumaDemanda = 0;
    var sumaIndices = 0;
    var sumaIndicesCuadrados = 0;
    var sumaProducto = 0;
    for (var i = 0; i < demanda.length; i++) {
      sumaDemanda += demanda[i];
      sumaIndices += i;
      sumaIndicesCuadrados += i * i;
      sumaProducto += i * demanda[i];
    }

    // Calcular los coeficientes de la regresión lineal
    var n = demanda.length;
    var b =
      (n * sumaProducto - sumaIndices * sumaDemanda) /
      (n * sumaIndicesCuadrados - sumaIndices * sumaIndices);
    var a = (sumaDemanda - b * sumaIndices) / n;

    // Mostrar los coeficientes de la regresión lineal
    document.getElementById("coeficientes").innerHTML =
      "<strong>a = " +
      a.toFixed(2) +
      ", b = " +
      b.toFixed(2) +
      "</strong><br><strong>y = " +
      b.toFixed(2) +
      "x + " +
      a.toFixed(2) +
      "</strong>";

    // Calcular el pronóstico
    var pronostico = [];
    for (var i = 0; i < demanda.length; i++) {
      pronostico.push(a + b * i);
    }

    // Limpiar la tabla
    var tabla = document.getElementById("data");
    tabla.innerHTML =
      "<tr><th>Mes</th><th>Demanda</th><th>Pronóstico</th><th>Error</th><th>Error Absoluto</th><th>Error Cuadrado</th><th>Error Porcentual</th></tr>";
    tabla.innerHTML =
      "<tr><th>Mes</th><th>Demanda</th><th>Pronóstico</th><th>Error</th><th>Error Absoluto</th><th>Error Cuadrado</th><th>Error Porcentual</th></tr>";

    // Variables para calcular MAD, MSE y MADE
    var sumaErroresAbsolutos = 0;
    var sumaErroresCuadrados = 0;
    var sumaErroresPorcentuales = 0;
    var contador = 0;

    // Agregar datos a la tabla
    for (var i = 0; i < demanda.length; i++) {
      var fila = tabla.insertRow(-1);
      var celda1 = fila.insertCell(0);
      var celda2 = fila.insertCell(1);
      celda1.innerHTML = "Mes " + (i + 1);
      celda2.innerHTML = demanda[i];
      var celda3 = fila.insertCell(2);
      celda3.innerHTML = pronostico[i].toFixed(2);
      var error = demanda[i] - pronostico[i];
      var celda4 = fila.insertCell(3);
      celda4.innerHTML = error.toFixed(2);
      var errorAbsoluto = Math.abs(error);
      var celda5 = fila.insertCell(4);
      celda5.innerHTML = errorAbsoluto.toFixed(2);
      var errorCuadrado = error * error;
      var celda6 = fila.insertCell(5);
      celda6.innerHTML = errorCuadrado.toFixed(2);
      var errorPorcentual = (errorAbsoluto / demanda[i]) * 100;
      var celda7 = fila.insertCell(6);
      celda7.innerHTML = errorPorcentual.toFixed(2) + "%";

      // Sumar los errores para calcular MAD, MSE y MADE
      sumaErroresAbsolutos += errorAbsoluto;
      sumaErroresCuadrados += errorCuadrado;
      sumaErroresPorcentuales += errorPorcentual;
      contador++;
    }

    // Calcular y mostrar MAD, MSE y MADE
    document.getElementById("mad").innerHTML =
      "MAD (Desviación Media Absoluta): " +
      (sumaErroresAbsolutos / contador).toFixed(2);
    document.getElementById("mse").innerHTML =
      "MSE (Error Cuadrático Medio): " +
      (sumaErroresCuadrados / contador).toFixed(2);
    document.getElementById("made").innerHTML =
      "MADE (Error Porcentual Medio Absoluto): " +
      (sumaErroresPorcentuales / contador).toFixed(2) +
      "%";

    // Calcular el pronóstico
    var pronostico = [];
    for (var i = 0; i < demanda.length; i++) {
      pronostico.push(a + b * i);
    }
    // Crear el gráfico
    var ctx = document.getElementById("myChart").getContext("2d");
    if (myChart) {
      myChart.destroy();
    }
    myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: Array.from(
          { length: demanda.length },
          (_, i) => "Mes " + (i + 1)
        ),
        datasets: [
          {
            label: "Demanda",
            data: demanda,
            borderColor: "rgba(255, 99, 132, 1)",
            fill: false,
          },
          {
            label: "Pronóstico",
            data: pronostico,
            borderColor: "rgba(75, 192, 192, 1)",
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    if (bandera == 0) {
      var divgrafico = document.getElementById("grafico");
      var divBotones = document.createElement("div");
      divgrafico.appendChild(divBotones);
      divBotones.className = "botones";
      var guardarButton = document.createElement("button");
      guardarButton.className = "boton";
      guardarButton.innerHTML = "Guardar";
      guardarButton.onclick = function () {
        Guardar();
      };
      divBotones.appendChild(guardarButton);

      var reiniciarButton = document.createElement("button");
      reiniciarButton.className = "boton";
      reiniciarButton.innerHTML = "Reiniciar";
      reiniciarButton.onclick = function () {
        Reiniciar();
      };
      divBotones.appendChild(reiniciarButton);
      bandera = 1;
    }
  });

function Guardar() {
  var container = document.querySelector(".container");
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
      .ref("imagesRL/" + nombreImagen + ".png");

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
      }
    );
  });
}

function Reiniciar() {
  location.reload();
}
