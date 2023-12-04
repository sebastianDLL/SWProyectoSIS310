function Empezar() {
  var empresa = prompt("Ingrese el nombre de la empresa");
  // Almacena el nombre de la empresa en localStorage
  localStorage.setItem("empresa", empresa);
  window.location.href = "calculos.html";
}

function volverAlInicio() {
  window.location.href = "index.html"; // Reemplaza 'index.html' con tu página de inicio
}
function guardar() {
  alert("Datos guardados correctamente");

  // Obtener datos actuales del localStorage
  var datosGuardados = localStorage.getItem("datosEmpresas");

  // Verificar si hay datos previos
  var datosEmpresas = datosGuardados ? JSON.parse(datosGuardados) : [];

  var nombreEmpresa = empresa;
  var empleadosAntiguo = document.getElementById("empleadosAntiguo").value;
  var horasTrabajoAntiguo = document.getElementById(
    "horasTrabajoAntiguo"
  ).value;
  var costoManoObraAntiguo = document.getElementById(
    "costoManoObraAntiguo"
  ).value;
  var gastosGeneralesAntiguo = document.getElementById(
    "gastosGeneralesAntiguo"
  ).value;
  var pedidosAntiguo = document.getElementById("pedidosAntiguo").value;
  var empleadosNuevo = document.getElementById("empleadosNuevo").value;
  var horasTrabajoNuevo = document.getElementById("horasTrabajoNuevo").value;
  var costoManoObraNuevo = document.getElementById("costoManoObraNuevo").value;
  var gastosGeneralesNuevo = document.getElementById(
    "gastosGeneralesNuevo"
  ).value;
  var capacidadProcesamientoNuevo = document.getElementById(
    "capacidadProcesamientoNuevo"
  ).value;

  // Cálculos
  var productividadUnSoloFactorAntiguo =
    pedidosAntiguo / (empleadosAntiguo * horasTrabajoAntiguo);
  var productividadUnSoloFactorNuevo =
    capacidadProcesamientoNuevo / (empleadosNuevo * horasTrabajoNuevo);

  var produccionAntiguo = pedidosAntiguo;
  var produccionNuevo = capacidadProcesamientoNuevo;
  var costosAntiguo =
    parseFloat(costoManoObraAntiguo) + parseFloat(gastosGeneralesAntiguo);
  var costosNuevo =
    parseFloat(costoManoObraNuevo) + parseFloat(gastosGeneralesNuevo);

  var productividadMultiplesFactoresAntiguo = produccionAntiguo / costosAntiguo;
  var productividadMultiplesFactoresNuevo = produccionNuevo / costosNuevo;

  var num =
    (productividadUnSoloFactorNuevo - productividadUnSoloFactorAntiguo) * 100;
  var cambioPorcentualUnSoloFactor =
    num.toFixed(2) / productividadUnSoloFactorAntiguo;

  var num2 =
    (productividadMultiplesFactoresNuevo -
      productividadMultiplesFactoresAntiguo) *
    100;
  var cambioPorcentualMultiplesFactores =
    num2.toFixed(2) / productividadMultiplesFactoresAntiguo;

  // Crear un objeto con los datos
  var datos = {
    nombreEmpresa: nombreEmpresa,
    empleadosAntiguo: empleadosAntiguo,
    horasTrabajoAntiguo: horasTrabajoAntiguo,
    costoManoObraAntiguo: costoManoObraAntiguo,
    gastosGeneralesAntiguo: gastosGeneralesAntiguo,
    pedidosAntiguo: pedidosAntiguo,
    empleadosNuevo: empleadosNuevo,
    horasTrabajoNuevo: horasTrabajoNuevo,
    costoManoObraNuevo: costoManoObraNuevo,
    gastosGeneralesNuevo: gastosGeneralesNuevo,
    capacidadProcesamientoNuevo: capacidadProcesamientoNuevo,
    cambioPorcentualUnSoloFactor: cambioPorcentualUnSoloFactor,
    cambioPorcentualMultiplesFactores: cambioPorcentualMultiplesFactores,
  };

  // Agregar nuevos datos al array
  datosEmpresas.push(datos);

  // Convertir el array a una cadena JSON
  var datosJSON = JSON.stringify(datosEmpresas);

  // Guardar los datos actualizados en localStorage
  localStorage.setItem("datosEmpresas", datosJSON);

   // Obtener los datos almacenados en localStorage después de la actualización
   var datosGuardados = JSON.parse(localStorage.getItem("datosEmpresas")) || [];

  // Mostrar los datos actualizados
  mostrarDatos(datosEmpresas);
  console.log("Datos guardados");
  console.log(datosJSON);
}

function mostrarDatos(datosEmpresas) {
  var contenidoHTML = "";

  // Iterar sobre cada objeto de datos y construir el HTML
  datosEmpresas.forEach(function (datosEmpresa, index) {
    contenidoHTML += `
              <div class="empresa" id="empresa${index + 1}">
                  <h2>${datosEmpresa.nombreEmpresa}</h2>
                  <p><strong>Empleados Antiguo:</strong> ${
                    datosEmpresa.empleadosAntiguo
                  }</p>
                  <p><strong>Horas de Trabajo Antiguo:</strong> ${
                    datosEmpresa.horasTrabajoAntiguo
                  }</p>
                  <p><strong>Costo Mano de Obra Antiguo:</strong> ${
                    datosEmpresa.costoManoObraAntiguo
                  }</p>
                  <p><strong>Gastos Generales Antiguo:</strong> ${
                    datosEmpresa.gastosGeneralesAntiguo
                  }</p>
                  <p><strong>Pedidos Antiguo:</strong> ${
                    datosEmpresa.pedidosAntiguo
                  }</p>
                  <p><strong>Empleados Nuevo:</strong> ${
                    datosEmpresa.empleadosNuevo
                  }</p>
                  <p><strong>Horas de Trabajo Nuevo:</strong> ${
                    datosEmpresa.horasTrabajoNuevo
                  }</p>
                  <p><strong>Costo Mano de Obra Nuevo:</strong> ${
                    datosEmpresa.costoManoObraNuevo
                  }</p>
                  <p><strong>Gastos Generales Nuevo:</strong> ${
                    datosEmpresa.gastosGeneralesNuevo
                  }</p>
                  <p><strong>Capacidad de Procesamiento Nuevo:</strong> ${
                    datosEmpresa.capacidadProcesamientoNuevo
                  }</p>
                  ${
                    datosEmpresa.cambioPorcentualUnSoloFactor
                      ? `<p><strong>Cambio Porcentual 1 Solo Factor:</strong> ${datosEmpresa.cambioPorcentualUnSoloFactor}</p>`
                      : ""
                  }
                  ${
                    datosEmpresa.cambioPorcentualMultiplesFactores
                      ? `<p><strong>Cambio Porcentual Multiple Factores:</strong> ${datosEmpresa.cambioPorcentualMultiplesFactores}</p>`
                      : ""
                  }
                  <button onclick="eliminarDatos(${index})">Eliminar</button>
              </div>
          `;
  });

  // Actualizar el contenido del div
  document.getElementById("datosGuardados").innerHTML = contenidoHTML;
}

function eliminarDatos(index) {
  // Obtener los datos almacenados en localStorage
  var datosGuardados = JSON.parse(localStorage.getItem("datosEmpresas")) || [];

  // Eliminar el conjunto de datos en la posición 'index'
  datosGuardados.splice(index, 1);

  // Guardar los datos actualizados en localStorage
  localStorage.setItem("datosEmpresas", JSON.stringify(datosGuardados));

  // Recargar la página para mostrar los datos actualizados
  location.reload();
}

function eliminarTodo() {
  // Limpiar todos los datos almacenados
  localStorage.removeItem("datosEmpresas");

  // Recargar la página para mostrar los datos actualizados
  location.reload();
}

function calcularProductividad() {
  var empleadosAntiguo = parseFloat(
    document.getElementById("empleadosAntiguo").value
  );
  var horasTrabajoAntiguo = parseFloat(
    document.getElementById("horasTrabajoAntiguo").value
  );
  var costoManoObraAntiguo = parseFloat(
    document.getElementById("costoManoObraAntiguo").value
  );
  var gastosGeneralesAntiguo = parseFloat(
    document.getElementById("gastosGeneralesAntiguo").value
  );
  var pedidosAntiguo = parseFloat(
    document.getElementById("pedidosAntiguo").value
  );

  var empleadosNuevo = parseFloat(
    document.getElementById("empleadosNuevo").value
  );
  var horasTrabajoNuevo = parseFloat(
    document.getElementById("horasTrabajoNuevo").value
  );
  var costoManoObraNuevo = parseFloat(
    document.getElementById("costoManoObraNuevo").value
  );
  var gastosGeneralesNuevo = parseFloat(
    document.getElementById("gastosGeneralesNuevo").value
  );
  var capacidadProcesamientoNuevo = parseFloat(
    document.getElementById("capacidadProcesamientoNuevo").value
  );

  var productividadUnSoloFactorAntiguo =
    pedidosAntiguo / (empleadosAntiguo * horasTrabajoAntiguo);
  var productividadUnSoloFactorNuevo =
    capacidadProcesamientoNuevo / (empleadosNuevo * horasTrabajoNuevo);

  var produccionAntiguo = pedidosAntiguo;
  var produccionNuevo = capacidadProcesamientoNuevo;
  var costosAntiguo = costoManoObraAntiguo + gastosGeneralesAntiguo;
  var costosNuevo = costoManoObraNuevo + gastosGeneralesNuevo;

  var productividadMultiplesFactoresAntiguo = produccionAntiguo / costosAntiguo;
  var productividadMultiplesFactoresNuevo = produccionNuevo / costosNuevo;

  var num =
    (productividadUnSoloFactorNuevo - productividadUnSoloFactorAntiguo) * 100;
  var cambioPorcentualUnSoloFactor =
    num.toFixed(2) / productividadUnSoloFactorAntiguo;

  var num2 =
    (productividadMultiplesFactoresNuevo -
      productividadMultiplesFactoresAntiguo) *
    100;
  var cambioPorcentualMultiplesFactores =
    num2.toFixed(2) / productividadMultiplesFactoresAntiguo;

  var resultadoDiv = document.getElementById("resultadoCalculos");
  resultadoDiv.innerHTML = "";

  var tabla = document.createElement("table");
  tabla.border = "1";

  var encabezados = ["Aspecto", "Antiguo", "Nuevo"];
  var encabezadoRow = document.createElement("tr");

  for (var i = 0; i < encabezados.length; i++) {
    var th = document.createElement("th");
    th.textContent = encabezados[i];
    encabezadoRow.appendChild(th);
  }

  tabla.appendChild(encabezadoRow);

  var datos = [
    [
      "Productividad de un solo factor",
      productividadUnSoloFactorAntiguo.toFixed(3) + " pedidos/hora",
      productividadUnSoloFactorNuevo.toFixed(3) + " pedidos/hora",
    ],
    [
      "Productividad de múltiples factores",
      productividadMultiplesFactoresAntiguo.toFixed(4) + " pedidos/bs",
      productividadMultiplesFactoresNuevo.toFixed(4) + " pedidos/bs",
    ],
  ];

  for (var i = 0; i < datos.length; i++) {
    var fila = document.createElement("tr");

    for (var j = 0; j < datos[i].length; j++) {
      var celda = document.createElement("td");
      celda.textContent = datos[i][j];
      fila.appendChild(celda);
    }

    tabla.appendChild(fila);
  }

  resultadoDiv.appendChild(tabla);

  resultadoDiv.innerHTML +=
    "<p>Cambio porcentual en la productividad de un solo factor: " +
    cambioPorcentualUnSoloFactor.toFixed(2) +
    "%</p>";
  resultadoDiv.innerHTML +=
    "<p>Cambio porcentual en la productividad de múltiples factores: " +
    cambioPorcentualMultiplesFactores.toFixed(2) +
    "%</p>";

  var ctx1 = document.getElementById("graficoUnSoloFactor").getContext("2d");
  var myChart1 = new Chart(ctx1, {
    type: "bar",
    data: {
      labels: ["Productividad Antiguo", "Productividad Nuevo"],
      datasets: [
        {
          label: "Productividad Un Solo Factor",
          data: [
            productividadUnSoloFactorAntiguo,
            productividadUnSoloFactorNuevo,
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
            "rgba(54, 162, 235, 0.5)",
          ],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 1,
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

  var ctx2 = document
    .getElementById("graficoMultiplesFactores")
    .getContext("2d");
  var myChart2 = new Chart(ctx2, {
    type: "bar",
    data: {
      labels: ["Productividad Antiguo", "Productividad Nuevo"],
      datasets: [
        {
          label: "Productividad Múltiples Factores",
          data: [
            productividadMultiplesFactoresAntiguo,
            productividadMultiplesFactoresNuevo,
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
            "rgba(54, 162, 235, 0.5)",
          ],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 1,
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
}
