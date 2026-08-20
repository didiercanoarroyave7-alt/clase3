import { useState } from "react";

function FormularioContacto({ onAgregar }) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");

  const manejarSubmit = (e) => {
    e.preventDefault();

    if (!nombre.trim() || !telefono.trim() || !email.trim()) {
      return;
    }

    const nuevoContacto = {
      nombre,
      telefono,
      email,
    };

    onAgregar(nuevoContacto);

    setNombre("");
    setTelefono("");
    setEmail("");
  };

  return (
    <form onSubmit={manejarSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <input
        type="text"
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
      />

      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button type="submit">
        Agregar contacto
      </button>
    </form>
  );
}

export default FormularioContacto;
