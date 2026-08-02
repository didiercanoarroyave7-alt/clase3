import { useState } from "react";

export default function FormularioContacto({ onAgregar }) {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    etiqueta: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((estadoAnterior) => ({
      ...estadoAnterior,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!form.nombre.trim() || !form.telefono.trim()) {
      alert("Completa al menos nombre y teléfono");
      return;
    }

    onAgregar(form);

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

      <button type="submit">Agregar contacto</button>
    </form>
  );
}