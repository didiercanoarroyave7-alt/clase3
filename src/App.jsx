import { useEffect, useState } from "react";
import "./App.css";

import Buscador from "./components/Buscador";
import ContactoCard from "./components/ContactoCard";
import FormularioContacto from "./components/FormularioContacto";

const API = "http://localhost:3001/contactos";

function App() {
  const [contactos, setContactos] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  // true = A-Z, false = Z-A
  const [ordenAsc, setOrdenAsc] = useState(true);

  // GET - Obtener contactos desde JSON Server
  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setContactos(data);
      })
      .catch((error) => {
        console.error("Error al obtener contactos:", error);
      });
  }, []);

  // POST - Agregar contacto
  const agregarContacto = (contacto) => {
    fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contacto),
    })
      .then((res) => res.json())
      .then((nuevoContacto) => {
        setContactos((prev) => [...prev, nuevoContacto]);
      })
      .catch((error) => {
        console.error("Error al agregar contacto:", error);
      });
  };

  // DELETE - Eliminar contacto
  const eliminarContacto = (id) => {
    fetch(`${API}/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setContactos((prev) =>
          prev.filter((contacto) => contacto.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error al eliminar contacto:", error);
      });
  };

  // Filtrar por nombre, email o etiqueta
  const contactosFiltrados = contactos.filter((contacto) => {
    const termino = busqueda.toLowerCase();

    const nombre = (contacto.nombre || "").toLowerCase();
    const email = (contacto.email || "").toLowerCase();
    const etiqueta = (contacto.etiqueta || "").toLowerCase();

    return (
      nombre.includes(termino) ||
      email.includes(termino) ||
      etiqueta.includes(termino)
    );
  });

  // Ordenar A-Z o Z-A
  const contactosOrdenados = [...contactosFiltrados].sort((a, b) => {
    const nombreA = (a.nombre || "").toLowerCase();
    const nombreB = (b.nombre || "").toLowerCase();

    if (nombreA < nombreB) return ordenAsc ? -1 : 1;
    if (nombreA > nombreB) return ordenAsc ? 1 : -1;

    return 0;
  });

  return (
    <div className="app">
      <h1>Agenda de Contactos</h1>
      <h1>Hola! Bienvenido a tu agenda de contactos.</h1>

      <FormularioContacto onAgregar={agregarContacto} />

      {/* Buscador y ordenamiento */}
      <div className="busqueda-orden">
        <Buscador
          busqueda={busqueda}
          setBusqueda={setBusqueda}
        />

        <button
          type="button"
          onClick={() => setOrdenAsc((prev) => !prev)}
        >
          {ordenAsc ? "Ordenar Z-A" : "Ordenar A-Z"}
        </button>
      </div>

      {/* Resultados */}
      <div className="contactos">
        {contactosOrdenados.length === 0 ? (
          <p>
            No se encontraron contactos que coincidan con la búsqueda.
          </p>
        ) : (
          contactosOrdenados.map((contacto) => (
            <ContactoCard
              key={contacto.id}
              contacto={contacto}
              onEliminar={eliminarContacto}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
