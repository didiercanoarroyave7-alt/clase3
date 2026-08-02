import { useState } from "react";
import { Link } from "react-router-dom";
import ContactoCard from "../components/ContactoCard";

export default function Contactos({ contactos, onDelete }) {
  const [busqueda, setBusqueda] = useState("");

  const contactosFiltrados = contactos.filter((contacto) =>
    contacto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <main className="app-container">

      {/* Encabezado */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1 className="app-title" style={{ margin: 0 }}>
          📒 Lista de contactos
        </h1>

        <Link to="/">
          <button className="btn-nav">
            Volver
          </button>
        </Link>
      </div>

      {/* Buscador */}
      <input 
        type="text"
        placeholder="🔍 Buscar contacto..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="input-busqueda"
      />

      {/* Lista */}
      <section className="lista-contactos">
        {contactosFiltrados.length > 0 ? (
          contactosFiltrados.map((c) => (
            <ContactoCard
              key={c.id}
              {...c}
              onDelete={onDelete}
            />
          ))
        ) : (
          <p style={{ textAlign: "center" }}>
            No se encontraron contactos.
          </p>
        )}
      </section>

    </main>
  );
}