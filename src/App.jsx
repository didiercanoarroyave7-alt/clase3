import { useEffect, useState } from "react";
import "./App.css";

import Buscador from "./components/Buscador";
import ContactoCard from "./components/ContactoCard";
import FormularioContacto from "./components/FormularioContacto";

const API = "http://localhost:3001/contactos";

function App() {
  const [contactos, setContactos] = useState([]);
  const [busqueda, setBusqueda] = useState("");

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

  // Filtrar contactos
  const contactosFiltrados = contactos.filter((contacto) =>
    contacto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="app">
      <h1>Agenda de Contactos</h1>
      <h1>Hola! Bienvenido a tu agenda de contactos.</h1>

      <FormularioContacto onAgregar={agregarContacto} />

      <Buscador
        busqueda={busqueda}
        setBusqueda={setBusqueda}
      />

      <div className="contactos">
        {contactosFiltrados.map((contacto) => (
          <ContactoCard
            key={contacto.id}
            contacto={contacto}
            onEliminar={eliminarContacto}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
