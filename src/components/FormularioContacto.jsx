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
    <form
      onSubmit={onSubmit}
      className="grid grid-cols-1 gap-3 rounded-lg border border-gray-200 bg-white p-5 shadow-sm sm:grid-cols-2"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="nombre" className="text-sm font-semibold text-gray-700">
          Nombre
        </label>
        <input
          id="nombre"
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={onChange}
          className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="telefono" className="text-sm font-semibold text-gray-700">
          Teléfono
        </label>
        <input
          id="telefono"
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={form.telefono}
          onChange={onChange}
          className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="correo" className="text-sm font-semibold text-gray-700">
          Correo
        </label>
        <input
          id="correo"
          type="email"
          name="correo"
          placeholder="Correo"
          value={form.correo}
          onChange={onChange}
          className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="etiqueta" className="text-sm font-semibold text-gray-700">
          Etiqueta
        </label>
        <input
          id="etiqueta"
          type="text"
          name="etiqueta"
          placeholder="Etiqueta"
          value={form.etiqueta}
          onChange={onChange}
          className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <button
        type="submit"
        className="rounded-lg bg-purple-600 px-4 py-2.5 font-semibold text-white transition hover:bg-purple-700 sm:col-span-2"
      >
        Agregar contacto
      </button>
    </form>
  );
}
