
import { useEffect, useState } from "react";
import "./App.css";

import Buscador from "./components/Buscador";
import ContactoCard from "./components/ContactoCard";
import FormularioContacto from "./components/FormularioContacto";

const API = "http://localhost:3001/contactos";

function App() {
  // ==========================================
  // ESTADOS
  // ==========================================

  // Lista de contactos
  const [contactos, setContactos] = useState([]);

  // Texto de búsqueda
  const [busqueda, setBusqueda] = useState("");

  // true = A-Z
  // false = Z-A
  const [ordenAsc, setOrdenAsc] = useState(true);

  // Página actual
  const [paginaActual, setPaginaActual] = useState(1);

  // Cantidad de contactos por página
  const [contactosPorPagina, setContactosPorPagina] = useState(3);

  // ==========================================
  // GET - OBTENER CONTACTOS
  // ==========================================

  useEffect(() => {
    fetch(API)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al obtener los contactos");
        }

        return res.json();
      })
      .then((data) => {
        setContactos(data);
      })
      .catch((error) => {
        console.error("Error al obtener contactos:", error);
      });
  }, []);

  // ==========================================
  // POST - AGREGAR CONTACTO
  // ==========================================

  const agregarContacto = (contacto) => {
    fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contacto),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al agregar contacto");
        }

        return res.json();
      })
      .then((nuevoContacto) => {
        setContactos((prev) => [...prev, nuevoContacto]);

        // Después de agregar, vamos a la última página
        setPaginaActual(1);
      })
      .catch((error) => {
        console.error("Error al agregar contacto:", error);
      });
  };

  // ==========================================
  // DELETE - ELIMINAR CONTACTO
  // ==========================================

  const eliminarContacto = (id) => {
    fetch(`${API}/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al eliminar contacto");
        }
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

  // ==========================================
  // FILTRAR CONTACTOS
  // ==========================================

  const contactosFiltrados = contactos.filter((contacto) => {
    const termino = busqueda.toLowerCase().trim();

    const nombre = (contacto.nombre || "").toLowerCase();
    const email = (contacto.email || "").toLowerCase();
    const etiqueta = (contacto.etiqueta || "").toLowerCase();

    return (
      nombre.includes(termino) ||
      email.includes(termino) ||
      etiqueta.includes(termino)
    );
  });

  // ==========================================
  // ORDENAR CONTACTOS
  // ==========================================

  const contactosOrdenados = [...contactosFiltrados].sort((a, b) => {
    const nombreA = (a.nombre || "").toLowerCase();
    const nombreB = (b.nombre || "").toLowerCase();

    if (nombreA < nombreB) {
      return ordenAsc ? -1 : 1;
    }

    if (nombreA > nombreB) {
      return ordenAsc ? 1 : -1;
    }

    return 0;
  });

  // ==========================================
  // PAGINACIÓN
  // ==========================================

  // Número total de páginas
  const totalPaginas = Math.ceil(
    contactosOrdenados.length / contactosPorPagina
  );

  // ==========================================
  // CORREGIR PÁGINA ACTUAL
  // ==========================================

  useEffect(() => {
    // Si cambia la búsqueda, el orden
    // o la cantidad por página,
    // volvemos a la página 1.
    setPaginaActual(1);
  }, [busqueda, ordenAsc, contactosPorPagina]);

  // Si eliminamos contactos y la página actual
  // deja de existir, regresamos a la última página.
  useEffect(() => {
    if (totalPaginas === 0) {
      setPaginaActual(1);
      return;
    }

    if (paginaActual > totalPaginas) {
      setPaginaActual(totalPaginas);
    }
  }, [paginaActual, totalPaginas]);

  // ==========================================
  // ÍNDICE DE INICIO
  // ==========================================

  const indiceInicio =
    (paginaActual - 1) * contactosPorPagina;

  // ==========================================
  // CONTACTOS DE LA PÁGINA ACTUAL
  // ==========================================

  const contactosPaginados = contactosOrdenados.slice(
    indiceInicio,
    indiceInicio + contactosPorPagina
  );

  // ==========================================
  // CAMBIAR PÁGINA
  // ==========================================

  const cambiarPagina = (numeroPagina) => {
    if (
      numeroPagina >= 1 &&
      numeroPagina <= totalPaginas
    ) {
      setPaginaActual(numeroPagina);
    }
  };

  // ==========================================
  // INTERFAZ
  // ==========================================

  return (
    <div className="app">

      {/* ======================================
          TÍTULO
      ====================================== */}

      <h1>Agenda de Contactos</h1>

      <h2>
        Hola! Bienvenido a tu agenda de contactos.
      </h2>

      {/* ======================================
          FORMULARIO
      ====================================== */}

      <FormularioContacto
        onAgregar={agregarContacto}
      />

      {/* ======================================
          BUSCADOR Y ORDENAMIENTO
      ====================================== */}

      <div className="busqueda-orden">

        {/* BUSCADOR */}

        <Buscador
          busqueda={busqueda}
          setBusqueda={setBusqueda}
        />

        {/* ORDENAR */}

        <button
          type="button"
          onClick={() =>
            setOrdenAsc((prev) => !prev)
          }
        >
          {ordenAsc
            ? "Ordenar A-Z"
            : "Ordenar Z-A"}
        </button>

        {/* CONTACTOS POR PÁGINA */}

        <select
          value={contactosPorPagina}
          onChange={(e) =>
            setContactosPorPagina(
              Number(e.target.value)
            )
          }
        >
          <option value={2}>
          página 2
          </option>

          <option value={3}>
            página 3
          </option>

          <option value={4}>
            página 4
          </option>
        </select>

      </div>

      {/* ======================================
          INFORMACIÓN DE PAGINACIÓN
      ====================================== */}

      <div className="info-paginacion">

        <span>
          {contactosOrdenados.length} contacto
          {contactosOrdenados.length !== 1
            ? "s"
            : ""}
        </span>

        <span>
          Página{" "}
          {totalPaginas === 0
            ? 0
            : paginaActual}{" "}
          de {totalPaginas}
        </span>

      </div>

      {/* ======================================
          RESULTADOS
      ====================================== */}

      <div className="contactos">

        {contactosPaginados.length === 0 ? (

          <p className="sin-resultados">
            No se encontraron contactos que
            coincidan con la búsqueda.
          </p>

        ) : (

          contactosPaginados.map((contacto) => (

            <ContactoCard
              key={contacto.id}
              contacto={contacto}
              onEliminar={eliminarContacto}
            />

          ))

        )}

      </div>

      {/* ======================================
          PAGINADOR
      ====================================== */}

      {totalPaginas > 0 && (

        <div className="paginacion">

          {/* ====================================
              BOTÓN ANTERIOR
          ==================================== */}

          <button
            type="button"
            disabled={paginaActual === 1}
            onClick={() =>
              cambiarPagina(paginaActual - 1)
            }
          >
            ← Anterior
          </button>

          {/* ====================================
              NÚMEROS DE PÁGINA
          ==================================== */}

          {Array.from(
            { length: totalPaginas },
            (_, i) => i + 1
          ).map((numero) => (

            <button
              type="button"
              key={numero}
              className={
                numero === paginaActual
                  ? "activo"
                  : ""
              }
              onClick={() =>
                cambiarPagina(numero)
              }
            >
              {numero}
            </button>

          ))}

          {/* ====================================
              BOTÓN SIGUIENTE
          ==================================== */}

          <button
            type="button"
            disabled={
              paginaActual === totalPaginas
            }
            onClick={() =>
              cambiarPagina(paginaActual + 1)
            }
          >
            Siguiente →
          </button>

        </div>

      )}

    </div>
  );
}

export default App;
