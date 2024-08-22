document.addEventListener("DOMContentLoaded", function () {
  $("#btnAgregarEstudiante").click(function () {
    $(".formularioAjax-estudiante").get(0).reset();
    $("#error1").html("");
  });
  $("#btnAgregarUsuario").click(function () {
    $(".formularioAjax").get(0).reset();
    $("#error").html("");
  });

  $("#btnConsultar").click(function () {
    let mostrar = $("#mostrar-consulta").val();

    if (mostrar == "0") {
      $("#consultas-estudiantes").show();
      $("#datos").html("");
      $("#mostrar-consulta").val("1");
    } else {
      $("#consultas-estudiantes").hide();
      $("#mostrar-consulta").val("0");
    }
  });

  $("#limpiar_consulta").click(function () {
    $("#datos").html("");
    $("#cedula-consulta").focus();
  });

  });

  function eliminarnuevo(e){
    e.preventDefault();

    let action = $('#formeliminarnuevo').attr('action');
    let data =$('#formeliminarnuevo').serialize();

   $.ajax({
        type: 'POST',
        url: action,
        data:data,
        success: function (respuesta) {
            let objdato= JSON.parse(respuesta);
            if (objdato.data == "eliminado") {
              $("#datos").html("");
              swal.fire({
                icon: "success",
                title: "Eliminar Nuevo",
                text: objdato.texto,
              });
            } else {
              swal.fire({
                icon: "warning",
                title: "Eliminar Nuevo",
                text: objdato.texto,
              });
              $("#datos").html("");
            }
        },
        error: function () {
          alert("No se pudo eliminar este registro...");
        }
      });
  }

  function eliminarplanilla(e){
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
    fetch(action, config)
      .then((respuesta) => respuesta.json())
      .then((respuesta) => {
        if (respuesta.data == "eliminado") {
          $("#datos").html("");
          swal.fire({
            icon: "success",
            title: "Eliminar Planilla",
            text: respuesta.texto,
          });
        } else {
          swal.fire({
            icon: "warning",
            title: "Eliminar planilla",
            text: respuesta.texto,
          });
          $("#datos").html("");
        }
      });
  }

$('.formularioAjax').submit(function (e) {
    e.preventDefault();

    let data = new FormData(this);
    let method = this.getAttribute("method");
    let action = this.getAttribute("action");

    let encabezados = new Headers();

    alert(method+"/"+action);

    let config = {
      method: method,
      headers: encabezados,
      mode: "cors",
      cache: "no-cache",
      body: data,
    };
    fetch(action, config)
      .then((respuesta) => respuesta.json())
      .then((respuesta) => {
        if (respuesta.data == "registrado") {
          swal.fire({
            icon: "success",
            title: "Admin",
            text: "Admin, Agregado Correctamente",
          });
          $(".formularioAjax").get(0).reset();
        } else {
          $("#error").html(
            '<div class="alert alert-danger" role="alert">' + respuesta.texto + "</div>"
          );
        }
      });
});

$('.formularioAjax-estudiante').submit(function (e) {
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
    fetch(action, config)
      .then((respuesta) => respuesta.json())
      .then((respuesta) => {
        if (respuesta.data == "registrado") {
          swal.fire({
            icon: "success",
            title: "Estudiante",
            text: "Estudiante, Agregado Correctamente",
          });
          $(".formularioAjax-estudiante").get(0).reset();
        } else {
          $("#error1").html(
            '<div class="alert alert-danger" role="alert">' + respuesta.texto + "</div>"
          );
        }
      });
});

$('.formularioAjax-consulta').submit(function (e) {
    e.preventDefault();

    $("#datos").html(
      '<tr class="table-danger text-center" scope="row"><td colspan="4">Consultando cedula, espere por favor...</td></tr>'
    );

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
    fetch(action, config)
      .then((respuesta) => respuesta.json())
      .then((respuesta) => {
        if (respuesta.data == "encontrado") {
          $("#datos").html(respuesta.texto);
          if(respuesta.nuevo=="si"){
            document.getElementById('formeliminarnuevo').addEventListener('submit',eliminarnuevo);
          }

          if(respuesta.planilla=="si"){
            document.getElementById('formularioAjax-eliminarplanilla').addEventListener('submit',eliminarplanilla);
          }
          
        } else {
          swal.fire({
            icon: "warning",
            title: "Consulta",
            text: respuesta.texto,
          });
          $("#datos").html(
            '<tr class="table-danger text-center" scope="row"><td colspan="4">Cedula no encontrada</td></tr>'
          );
        }
      });
})
