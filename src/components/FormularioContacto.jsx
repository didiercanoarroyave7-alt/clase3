import { useState } from "react";

export default function FormularioContacto({ onAgregar }) {
  // Estado del formulario
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    etiqueta: "",
  });

  // Actualiza los campos del formulario
  const onChange = (e) => {
    const { name, value } = e.target;

    setForm((estadoAnterior) => ({
      ...estadoAnterior,
      [name]: value,
    }));
  };

  // Envía el formulario
  const onSubmit = (e) => {
    e.preventDefault();

    // Validación
    if (!form.nombre.trim() || !form.telefono.trim()) {
      alert("Completa al menos nombre y teléfono");
      return;
    }

    // Envía los datos al componente padre
    onAgregar(form);

    // Limpia el formulario
    setForm({
      nombre: "",
      correo: "",
      telefono: "",
      etiqueta: "",
    });
  };

  return (
    <form onSubmit={onSubmit} className="form-contacto">
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={form.nombre}
        onChange={onChange}
      />

      <input
        type="text"
        name="telefono"
        placeholder="Teléfono"
        value={form.telefono}
        onChange={onChange}
      />

      <input
        type="email"
        name="correo"
        placeholder="Correo"
        value={form.correo}
        onChange={onChange}
      />

      <input
        type="text"
        name="etiqueta"
        placeholder="Etiqueta"
        value={form.etiqueta}
        onChange={onChange}
      />

      <button type="submit">
        Agregar contacto
      </button>
    </form>
  );
}