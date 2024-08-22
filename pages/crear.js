export default function crear() {

    let url = 'https://luismiguel2301.github.io/SRCUR/';

    $(document).ready(function(){

        $('#agregar-empleado').click(function(){
            agregarEmpleado();
        })
    })

        function agregarEmpleado(){
            const datos = {
                nombre:$('#nombre').val(),
                apellido:$('#apellido').val()
            }

            if(datos.nombre!=="" && datos.apellido!==""){
                fetch(url+'bd/index.php?insertar=1',{
                    method:"POST",
                    body:JSON.stringify(datos)
                })
                .then(respuesta=>respuesta.json())
                .then((datosRespuesta=>{
                    console.log(datosRespuesta);
                    window.location.href=url;
                }))
            }else{
                Swal.fire({
                    icon:"warning",
                    text:"Llene todos los campos"
                });
            }
        }
    

  return (
    `
    <div class="py-5">
        <div class="card">
  <div class="card-header">Agregar Nuevo Empleado</div>
  <div class="card-body">
      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input
          type="text"
          class="form-control"
          name="nombre"
          id="nombre"
          aria-describedby="helpId"
          placeholder="nombre"
        />
        <small id="helpId" class="form-text text-muted">
          Escribe el nombre del empleado</small
        >
      </div>

      <div class="form-group">
        <label for="nombre">Apellido:</label>
        <input
          type="text"
          class="form-control"
          name="apellido"
          id="apellido"
          aria-describedby="helpId"
          placeholder="apellido"
        />
        <small id="helpId" class="form-text text-muted">
          Escribe el apellido del empleado</small
        >
      </div>
      <div class="btn-group" role="group">
        <button type="buttom"  id="agregar-empleado" class="btn btn-primary">Agregar</button>
      </div>
  </div>
</div>
</div>
    </div>
`

  );
}



