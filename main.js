import {inicioLink, crearLink, editarLink, crear,editar,inicio} from "./pages/router.js";

var vista = "inicio";
$(document).ready(function(){

    $('#inicio').click(function(){
        vista = "inicio";
        app(vista);
    })
    $('#crear').click(function (){
        vista = "crear";
        app(vista);
    })
    $('#editar').click(function(){
        vista = "editar";
        app(vista);
    })
})


  async function app(view) {

    let result = "";

    if(view === "inicio") {
        result = await inicioLink(view);
    }

    if(view === "crear") {
        result = await crearLink(view);
    }

    if(view === "editar") {
        result = await editarLink(view);
    }

    if(result === "inicio") result = inicio();
  if(result=== "crear") result = crear();
  if(result=== "editar") result= editar();
        
    $("#app").html(result);

    vista="";
    // Expected output: "resolved"
  }

  console.log(vista);

  app(vista);


  
