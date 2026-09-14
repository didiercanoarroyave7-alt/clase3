
// API (json-server)

// Único lugar donde se hace fetch a la API
// de contactos. Se levanta con:
//   npx json-server db.json --port 3001

const URL_BASE = "http://localhost:3001";


// SOLICITUD BASE
// maneja todas las api 


async function solicitar(ruta, opciones = {}) {
  const respuesta = await fetch(`${URL_BASE}${ruta}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...opciones,
  });

  if (!respuesta.ok) {
    throw new Error(
      `La API respondió con error ${respuesta.status}`
    );
  }

  // DELETE puede venir sin cuerpo.
  if (respuesta.status === 204) {
    return null;
  }

  return respuesta.json();
}


// OPERACIONES
// todas las operaciones CRUD (Crear, Leer, Actualizar, 
// Borrar) utilizando la función helper solicitar.



export const api = {
  obtener(ruta) {
    return solicitar(ruta);
  },

  crear(ruta, datos) {
    return solicitar(ruta, {
      method: "POST",
      body: JSON.stringify(datos),
    });
  },

  actualizar(ruta, datos) {
    return solicitar(ruta, {
      method: "PATCH",
      body: JSON.stringify(datos),
    });
  },

  eliminar(ruta) {
    return solicitar(ruta, {
      method: "DELETE",
    });
  },
};


// CONTACTOS
// mapeando las operaciones de la interfaz 
// a las rutas específicas del backend ( /contactos)

export const servicioContactos = {
  listar() {
    return api.obtener("/contactos");
  },

  crear(contacto) {
    return api.crear("/contactos", contacto);
  },

  eliminar(id) {
    return api.eliminar(`/contactos/${id}`);
  },
};
