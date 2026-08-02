import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Inicio from "./pages/Inicio";
import Contactos from "./pages/Contactos";
import "./App.css";

export default function App() {
  const [contactos, setContactos] = useState([
    {
      id: 1,
      nombre: "Carolina Pérez",
      telefono: "300 123 4567",
      correo: "carolina@sena.edu.co",
      etiqueta: "Compañera",
    },
    {
      id: 2,
      nombre: "Andrés Mateo",
      telefono: "345 550 322",
      correo: "andres@sena.edu.co",
      etiqueta: "Tutor",
    },
    {
      id: 3,
      nombre: "Jerónimo Peláez",
      telefono: "334 123 4567",
      correo: "jero@sena.edu.co",
      etiqueta: "Compañero",
    },
  ]);

  // Agregar un nuevo contacto a la lista
  const agregarContacto = (nuevoContacto) => {
    setContactos((prev) => [
      ...prev,
      { id: Date.now(), ...nuevoContacto },
    ]);
  };

  // Eliminar un contacto por su ID
  const eliminarContacto = (id) => {
    setContactos((prev) =>
      prev.filter((contacto) => contacto.id !== id)
    );
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<Inicio onAgregar={agregarContacto} />}
      />
      <Route
        path="/contactos"
        element={
          <Contactos
            contactos={contactos}
            onDelete={eliminarContacto}
          />
        }
      />
    </Routes>
  );
}