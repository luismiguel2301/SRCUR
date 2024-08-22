const formularios_ajax = document.querySelectorAll(".formularioAjax");
formularios_ajax.forEach((formularios) => {
  formularios.addEventListener("submit", function (e) {
    e.preventDefault();

    let data = new FormData(this);
    let method = this.getAttribute("method");
    let action = this.getAttribute("action");

    let encabezados = new Headers();

    let config = {
      method: method,
      headers: encabezados,
      mode: "cors",
      cache: "no-cache",
      body: data,
    };

    var modulo = $("#modulo_planilla").val();

    if (modulo == "modulo_planilla") {
      fetch(action, config)
        .then((respuesta) => respuesta.json())
        .then((respuesta) => {
          if (respuesta.resultado == "error") {
            Swal.fire({
              icon: "warning",
              title: "Planilla",
              text: respuesta.texto,
            });
          } else {
            generar_planilla();
          }
        });
    } else {
      fetch(action, config)
        .then((respuesta) => respuesta.json())
        .then((respuesta) => {
          if (respuesta.data == "registrado") {
            window.location.href = respuesta.texto;
          } else {
            error_datos(respuesta);
          }
        });
    }
  });
});

function error_datos(respuesta) {
  $("#error").html(
    '<div class="alert alert-danger" role="alert">' + respuesta.texto + "</div>"
  );
  $("#error1").html(
    '<div class="alert alert-danger" role="alert">' + respuesta.texto + "</div>"
  );
}

function generar_planilla() {
  var cedula = $("#cedula_r").val();
  let url = $("#url").val();
  $("#formularioAjax").prop("action", url + "app/planilla/planilla.php");

  let form = document.getElementById("formularioAjax");
  var xhr = new XMLHttpRequest();
  xhr.open("POST", form.action);
  xhr.responseType = "blob";

  xhr.onload = function (e) {
    if (this.status == 200) {
      var blob = new Blob([this.response], { type: "application/pdf" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = cedula + "-planilla.pdf";
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);

      Swal.fire({ icon: "success", title: "Se descargo el Archivo!" });
    }
  };

  xhr.send(new FormData(form));

  $("#formularioAjax").prop("action", url + "app/ajax/planillaAjax.php");
}

document.addEventListener("DOMContentLoaded", function () {
  $("#si").change(function () {
    $("#discapacidad").val("");
    $("#discapacidad").show();
  });

  $("#no").change(function () {
    $("#discapacidad").val("");
    $("#discapacidad").hide();
  });

  $("#fechanacimiento").change(function () {
    var fech = new Date(document.getElementById("fechanacimiento").value);
    var hoy = new Date();

    var edad = hoy.getFullYear() - fech.getFullYear();

    if (
      hoy.getMonth() < fech.getMonth() ||
      (hoy.getMonth() == fech.getMonth() && fech.getDate() > hoy.getDate() - 1)
    ) {
      edad--;
    }

    document.getElementById("edad").value = edad;
  });
});

/* Boton cerrar sesion */
if (document.getElementById("btn_exit")) {
  let btn_exit = document.getElementById("btn_exit");

  btn_exit.addEventListener("click", function (e) {
    e.preventDefault();

    Swal.fire({
      title: "¿Quieres salir del sistema?",
      text: "La sesión actual se cerrará y saldrás del sistema",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, salir",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        let url = this.getAttribute("href");
        window.location.href = url;
      }
    });
  });
}
