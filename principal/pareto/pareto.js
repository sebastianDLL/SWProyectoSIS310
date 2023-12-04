function salir() {
  window.location.href = "../index.html";
}

function reiniciar() {
  window.location.href = "pareto.html";
}

function guardar() {
  setTimeout(function () {
    html2canvas(document.getElementById('chartContainer')).then(function (canvas) {
      var imgData = canvas.toDataURL();

      var a = document.createElement('a');
      a.download = "GraficoDatos.png";
      a.href = imgData;
      a.click();
    });
  }, 1000); // Espera 1 segundo antes de descargar la imagen
}


window.onload = function () {
  var form = document.getElementById("form");
  var cantidad = document.getElementById("cantidad");
  var generar = document.getElementById("generar");
  var enviar = document.getElementById("enviar");
  var contenedor = document.getElementById("contenedor");
  var chartContainer = document.getElementById("chartContainer");

  generar.addEventListener("click", function () {
    contenedor.innerHTML = "";
    var n = parseInt(cantidad.value);
    if (n > 0) {
      for (var i = 0; i < n; i++) {
        var input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Nombre, valor";
        contenedor.appendChild(input);
      }
      enviar.style.display = "block";
    } else {
      enviar.style.display = "none";
    }
  });

  enviar.addEventListener("click", function () {
    var inputs = contenedor.querySelectorAll("input");
    var data = [];
    for (var i = 0; i < inputs.length; i++) {
      var input = inputs[i];
      var partes = input.value.split(",");
      var nombre = partes[0].trim();
      var valor = parseFloat(partes[1].trim());
      if (nombre && valor) {
        data.push({ label: nombre, value: valor });
      }
    }

    data.sort(function (a, b) {
      return b.value - a.value;
    });

    var total = data.reduce(function (acc, curr) {
      return acc + curr.value;
    }, 0);

    var cumulative = 0;
    for (var i = 0; i < data.length; i++) {
      cumulative += data[i].value;
      data[i].cumulative = (cumulative / total) * 100;
    }

    var tabla = document.createElement("table");
    tabla.style.border = "1px solid black";
    tabla.style.borderCollapse = "collapse";
    tabla.style.margin = "10px";
    var thead = document.createElement("thead");
    var tr = document.createElement("tr");
    var th1 = document.createElement("th");
    th1.textContent = "Nombre";
    th1.style.border = "1px solid black";
    th1.style.padding = "5px";
    var th2 = document.createElement("th");
    th2.textContent = "Valor";
    th2.style.border = "1px solid black";
    th2.style.padding = "5px";
    var th3 = document.createElement("th");
    th3.textContent = "Porcentaje acumulado";
    th3.style.border = "1px solid black";
    th3.style.padding = "5px";
    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    thead.appendChild(tr);
    tabla.appendChild(thead);
    var tbody = document.createElement("tbody");
    for (var i = 0; i < data.length; i++) {
      var tr = document.createElement("tr");
      var td1 = document.createElement("td");
      td1.textContent = data[i].label;
      td1.style.border = "1px solid black";
      td1.style.padding = "5px";
      var td2 = document.createElement("td");
      td2.textContent = data[i].value;
      td2.style.border = "1px solid black";
      td2.style.padding = "5px";
      var td3 = document.createElement("td");
      td3.textContent = data[i].cumulative.toFixed(2) + "%";
      td3.style.border = "1px solid black";
      td3.style.padding = "5px";
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tbody.appendChild(tr);
    }
    tabla.appendChild(tbody);
    contenedor.appendChild(tabla);

    var indice = 0;
    while (data[indice].cumulative < 80) {
      indice++;
    }

    var conclusion =
      "Según el diagrama de Pareto, el " +
      data[indice].cumulative.toFixed(2) +
      "% del total se debe a los primeros " +
      (indice + 1) +
      " elementos. Estos elementos son: ";
    for (var i = 0; i <= indice; i++) {
      conclusion += data[i].label + " (" + data[i].value + ")";
      if (i < indice) {
        conclusion += ", ";
      } else {
        conclusion += ".";
      }
    }

    var p = document.createElement("p");
    p.style.fontWeight = "bold";
    p.textContent = conclusion;
    p.style.margin = "10px";
    contenedor.appendChild(p);

    var chart = new CanvasJS.Chart("chartContainer", {
      title: {
        text: "Diagrama de Pareto",
      },
      axisY: {
        title: "Valor",
        lineColor: "#4F81BC",
        tickColor: "#4F81BC",
        labelFontColor: "#4F81BC",
      },
      axisY2: {
        title: "Porcentaje acumulado",
        suffix: "%",
        lineColor: "#C0504E",
        tickColor: "#C0504E",
        labelFontColor: "#C0504E",
      },
      data: [
        {
          type: "column",
          dataPoints: data.map(function (item) {
            return { label: item.label, y: item.value };
          }),
        },
        {
          type: "line",
          axisYType: "secondary",
          dataPoints: data.map(function (item) {
            return { label: item.label, y: item.cumulative };
          }),
        },
      ],
    });

    chart.render();

    var divBotones = document.createElement("div");
    divBotones.className = "botones";

    var guardarButton = document.createElement("button");
    guardarButton.className = "boton";
    guardarButton.innerHTML = "Guardar";
    guardarButton.onclick = function () {
      guardar();
    };
    divBotones.appendChild(guardarButton);

    var reiniciarButton = document.createElement("button");
    reiniciarButton.className = "boton";
    reiniciarButton.innerHTML = "Reiniciar";
    reiniciarButton.onclick = function () {
      reiniciar();
    };
    divBotones.appendChild(reiniciarButton);

    var salirButton = document.createElement("button");
    salirButton.className = "boton";
    salirButton.innerHTML = "Salir";
    salirButton.onclick = function () {
      salir();
    };
    divBotones.appendChild(salirButton);

    // Configurar estilos de posición
    divBotones.style.position = "fixed";
    divBotones.style.bottom = "0";
    divBotones.style.left = "50%";
    divBotones.style.transform = "translateX(-50%)";

    // Agregar los botones al elemento contenedor
    document.body.appendChild(divBotones);
  });
};
