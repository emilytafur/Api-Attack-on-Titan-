
const API_URL = "https://api.attackontitanapi.com/titans";


const contenedor = document.getElementById("contenedor-detalle");
const template   = document.getElementById("template-detalle");


const params = new URLSearchParams(window.location.search);
const titanId = params.get("id"); 


async function obtenerDetalle() {
  if (!titanId) {
    contenedor.textContent = "No se indicó ningún titán.";
    return;
  }

  try {
    const respuesta = await fetch(API_URL + "/" + titanId);

    if (!respuesta.ok) {
      throw new Error("Error del servidor: " + respuesta.status);
    }

    const titan = await respuesta.json();
    mostrarDetalle(titan);

    document.title = titan.name + " — Attack on Titan";

  } catch (error) {
    console.error("Ocurrió un error:", error);
    contenedor.textContent = "No se pudo cargar el titán: " + error.message;
  }
}


function mostrarDetalle(titan) {
  contenedor.innerHTML = "";

  const clon = template.content.cloneNode(true);

  clon.querySelector(".detalle-img").src = titan.img;
  clon.querySelector(".detalle-img").alt = "Imagen de " + titan.name;

  clon.querySelector(".detalle-id").textContent      = "#" + titan.id;
  clon.querySelector(".detalle-nombre").textContent  = titan.name;
  clon.querySelector(".detalle-altura").textContent  = titan.height;
  clon.querySelector(".detalle-alianza").textContent = titan.allegiance;

 
  const herederoActual = titan.current_inheritor
    ? "Personaje #" + titan.current_inheritor.split("/").pop()
    : "Ninguno";
  clon.querySelector(".detalle-heredero-actual").textContent = herederoActual;

  const listaHerederos = titan.former_inheritors.length > 0
    ? titan.former_inheritors.map((url) => "Personaje #" + url.split("/").pop()).join(", ")
    : "Ninguno";
  clon.querySelector(".detalle-herederos-pasados").textContent = listaHerederos;

  const listaUL = clon.querySelector(".detalle-lista-habilidades");
  titan.abilities.forEach((habilidad) => {
    const item = document.createElement("li");
    item.textContent = habilidad;
    listaUL.appendChild(item);
  });

  contenedor.appendChild(clon);
}
obtenerDetalle();