
const API_URL = "https://api.attackontitanapi.com/titans";

const contenedor = document.getElementById("contenedor-titanes");
const template   = document.getElementById("template-titan");


async function obtenerTitanes() {
  try {
    const respuesta = await fetch(API_URL);

    if (!respuesta.ok) {
      throw new Error(`Error del servidor: ${respuesta.status}`);
    }

    const datos = await respuesta.json();
    const titanes = datos.results;

    mostrarTitanes(titanes);

  } catch (error) {
    console.error("Ocurrió un error:", error);
    contenedor.textContent = "No se pudo cargar la información: " + error.message;
  }
}

function mostrarTitanes(titanes) {
  contenedor.innerHTML = "";

  titanes.forEach((titan) => {

    const clon = template.content.cloneNode(true);

    clon.querySelector(".titan-img").src = titan.img;
    clon.querySelector(".titan-img").alt = "Imagen de " + titan.name;

    clon.querySelector(".titan-id").textContent      = "#" + titan.id;
    clon.querySelector(".titan-nombre").textContent  = titan.name;
    clon.querySelector(".titan-altura").textContent  = titan.height;
    clon.querySelector(".titan-alianza").textContent = titan.allegiance;


    const herederoActual = titan.current_inheritor
      ? "Personaje #" + titan.current_inheritor.split("/").pop()
      : "Ninguno";
    clon.querySelector(".titan-heredero-actual").textContent = herederoActual;

  
    const listaHerederos = titan.former_inheritors.length > 0
      ? titan.former_inheritors.map((url) => "Personaje #" + url.split("/").pop()).join(", ")
      : "Ninguno";
    clon.querySelector(".titan-herederos-pasados").textContent = listaHerederos;


    const listaUL = clon.querySelector(".lista-habilidades");
    titan.abilities.forEach((habilidad) => {
      const item = document.createElement("li");
      item.textContent = habilidad;
      listaUL.appendChild(item);
    });

  
    clon.querySelector(".titan-card").addEventListener("click", () => {
      window.location.href = "detalle.html?id=" + titan.id;
    });

  
    contenedor.appendChild(clon);
  });
}

obtenerTitanes();