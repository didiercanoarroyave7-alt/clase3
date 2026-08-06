import { useState, useEffect } from "react";
import ContactoCard from "./components/ContactoCard";
import FormularioContacto from "./components/FormularioContacto";
import Buscador from "./components/Buscador";
import Saludo from "./components/Saludo";

export default function App() {
  const [contactos, setContactos] = useState(() => {
    const contactosGuardados = localStorage.getItem("contactos");
    if (contactosGuardados) {
      return JSON.parse(contactosGuardados);
    }

    return [
      {
        id: 1,
        nombre: "Carolina Pérez",
        telefono: "300 123 4567",
        correo: "carolina@sena.edu.co",
        etiqueta: "Compañera",
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem("contactos", JSON.stringify(contactos));
  }, [contactos]);

  const [busqueda, setBusqueda] = useState("");

  const agregarContacto = (nuevo) => {
    setContactos((prev) => [...prev, { id: Date.now(), ...nuevo }]);
  };

  const eliminarContacto = (id) => {
    setContactos((prev) => prev.filter((c) => c.id !== id));
  };

  const contactosFiltrados = contactos.filter((contacto) => {
    const termino = busqueda.toLowerCase().trim();
    if (!termino) return true;

    const nombre = (contacto.nombre || "").toLowerCase();
    const telefono = (contacto.telefono || "").toLowerCase();
    const correo = (contacto.correo || "").toLowerCase();
    const etiqueta = (contacto.etiqueta || "").toLowerCase();

    return (
      nombre.includes(termino) ||
      telefono.includes(termino) ||
      correo.includes(termino) ||
      etiqueta.includes(termino)
    );
  });

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-5xl">
        <header className="mb-6 text-center">
          <Saludo nombre="Aprendiz" curso="React - ADSO" />
          <h1 className="mt-6 text-3xl font-bold text-purple-700">Agenda ADSO v4</h1>
        </header>

        <div className="space-y-4">
          <FormularioContacto onAgregar={agregarContacto} />
          <Buscador busqueda={busqueda} setBusqueda={setBusqueda} />

          <section className="space-y-4">
            {contactosFiltrados.length > 0 ? (
              contactosFiltrados.map((c) => (
                <ContactoCard
                  key={c.id}
                  id={c.id}
                  nombre={c.nombre}
                  telefono={c.telefono}
                  correo={c.correo}
                  etiqueta={c.etiqueta}
                  onDelete={eliminarContacto}
                />
              ))
            ) : (
              <p className="rounded-lg border border-gray-200 bg-white p-4 text-center text-sm text-gray-600 shadow-sm">
                No se encontraron contactos.
              </p>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}