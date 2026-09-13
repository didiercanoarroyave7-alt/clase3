// ==========================================
// PÁGINA: ADMINISTRADOR
// ==========================================
// Solo llega aquí quien tenga el rol
// administrador (lo controla RutaProtegida).

import { useMemo, useState } from "react";

import Alerta from "../../componentes/comunes/Alerta";
import Cargando from "../../componentes/comunes/Cargando";

import BarraBusqueda from "../../componentes/contactos/BarraBusqueda";
import FormularioContacto from "../../componentes/contactos/FormularioContacto";
import ListaContactos from "../../componentes/contactos/ListaContactos";
import Paginacion from "../../componentes/contactos/Paginacion";

import { usarAutenticacion } from "../../hooks/usarAutenticacion";
import { usarContactos } from "../../hooks/usarContactos";

import { listarUsuarios } from "../../servicios/servicioAutenticacion";
import { PERMISOS, etiquetaDelRol } from "../../utilidades/roles";

function PaginaAdministrador() {
  const { usuario, tienePermiso } = usarAutenticacion();

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
    agregar,
    eliminar,
    correoRepetido,
  } = usarContactos({ porPagina: 3 });

  // Los usuarios registrados salen de localStorage.
  const usuarios = useMemo(() => listarUsuarios(), []);

  const puedeEliminar = tienePermiso(
    PERMISOS.ELIMINAR_CONTACTO
  );

  const manejarEliminar = async (id) => {
    if (!puedeEliminar) {
      setAviso({
        tipo: "advertencia",
        texto: "No tienes permiso para eliminar contactos.",
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
        <h2 className="pagina__titulo">Administración</h2>

        <p className="pagina__descripcion">
          Panel exclusivo del administrador.
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

      {/* ======================================
          CREAR CONTACTO
      ====================================== */}

      <FormularioContacto
        onAgregar={agregar}
        correoRepetido={correoRepetido}
      />

      {/* ======================================
          GESTIONAR CONTACTOS
      ====================================== */}

      <h3 className="pagina__subtitulo">Contactos</h3>

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
          />

          <Paginacion
            paginaActual={paginaActual}
            totalPaginas={totalPaginas}
            alCambiar={cambiarPagina}
          />
        </>
      )}

      {/* ======================================
          USUARIOS REGISTRADOS
      ====================================== */}

      <h3 className="pagina__subtitulo">
        Usuarios registrados ({usuarios.length})
      </h3>

      <div className="tabla-envoltorio">
        <table className="tabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
            </tr>
          </thead>

          <tbody>
            {usuarios.map((registro) => (
              <tr key={registro.id}>
                <td>
                  {registro.nombre}
                  {registro.correo === usuario?.correo && (
                    <span className="tabla__tu"> (tú)</span>
                  )}
                </td>

                <td>{registro.correo}</td>

                <td>{etiquetaDelRol(registro.rol)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default PaginaAdministrador;
