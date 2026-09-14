
// PÁGINA: BÚSQUEDA
// Listado principal con barra de búsqueda,
// orden y paginación.

import { useState } from "react";

import Alerta from "../../componentes/comunes/Alerta";
import Cargando from "../../componentes/comunes/Cargando";

import BarraBusqueda from "../../componentes/contactos/BarraBusqueda";
import ListaContactos from "../../componentes/contactos/ListaContactos";
import Paginacion from "../../componentes/contactos/Paginacion";

import { usarAutenticacion } from "../../hooks/usarAutenticacion";
import { usarContactos } from "../../hooks/usarContactos";

import { PERMISOS } from "../../utilidades/roles";

function PaginaBusqueda() {
  const { tienePermiso } = usarAutenticacion();

  const [aviso, setAviso] = useState(null);

  const {
    paginados,
    totalFiltrados,
    cargando,
    error,
    busqueda,
    setBusqueda,
    ordenAsc,
    setOrdenAsc,
    paginaActual,
    totalPaginas,
    contactosPorPagina,
    setContactosPorPagina,
    cambiarPagina,
    eliminar,
  } = usarContactos({ porPagina: 4 });

  const puedeEliminar = tienePermiso(
    PERMISOS.ELIMINAR_CONTACTO
  );

  // Segunda barrera: aunque el botón esté oculto,
  // la acción vuelve a revisar el permiso.
  const manejarEliminar = async (id) => {
    if (!puedeEliminar) {
      setAviso({
        tipo: "advertencia",
        texto:
          "No tienes permiso para eliminar contactos. Pide acceso de administrador.",
      });

      return;
    }

    try {
      await eliminar(id);

      setAviso({
        tipo: "exito",
        texto: "Contacto eliminado.",
      });
    } catch {
      setAviso({
        tipo: "error",
        texto: "No se pudo eliminar el contacto.",
      });
    }
  };

  return (
    <section className="pagina">
      <header className="pagina__cabecera">
        <h2 className="pagina__titulo">Buscar contactos</h2>

        <p className="pagina__descripcion">
          Escribe un nombre, correo, teléfono o etiqueta. 
        </p>
      </header>

      {error && <Alerta tipo="error">{error}</Alerta>}

      {aviso && (
        <Alerta
          tipo={aviso.tipo}
          alCerrar={() => setAviso(null)}
        >
          {aviso.texto}
        </Alerta>
      )}

      <BarraBusqueda
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        ordenAsc={ordenAsc}
        setOrdenAsc={setOrdenAsc}
        contactosPorPagina={contactosPorPagina}
        setContactosPorPagina={setContactosPorPagina}
      />

      <div className="info-paginacion">
        <span>
          {totalFiltrados} contacto
          {totalFiltrados !== 1 ? "s" : ""}
          {busqueda && ` para "${busqueda}"`}
        </span>

        <span>
          Página {totalPaginas === 0 ? 0 : paginaActual} de{" "}
          {totalPaginas}
        </span>
      </div>

      {cargando ? (
        <Cargando texto="Cargando contactos..." />
      ) : (
        <>
          <ListaContactos
            contactos={paginados}
            puedeEliminar={puedeEliminar}
            onEliminar={manejarEliminar}
            mensajeVacio={
              busqueda
                ? `No se encontraron contactos que coincidan con "${busqueda}".`
                : "Todavía no hay contactos en la agenda."
            }
          />

          <Paginacion
            paginaActual={paginaActual}
            totalPaginas={totalPaginas}
            alCambiar={cambiarPagina}
          />
        </>
      )}
    </section>
  );
}

export default PaginaBusqueda;
