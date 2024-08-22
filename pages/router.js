import crear from "./crear.js";
import editar from "./editar.js";
import inicio from "./inicio.js";

var vistaActual="";
var view="";
const router = [
  { path: "inicio", component: "inicio" },
  { path: "crear", component: "crear" },
  { path: "editar", component: "editar" },
];

function inicioLink(view) {
    for (let pages of router) {
      if (pages.path === view) {
        vistaActual = pages.component;
        break;
      }
      
    }
    return vistaActual;
  }

  function crearLink(view) {
    for (let pages of router) {
      if (pages.path === view) {
        vistaActual = pages.component;
        break;
      }
      
    }
    return vistaActual;
  }

  function editarLink(view) {
    for (let pages of router) {
      if (pages.path === view) {
        vistaActual = pages.component;
        break;
      }

      
    }
    return vistaActual;
  }

  

export {inicioLink, crearLink, editarLink,crear,editar,inicio};
