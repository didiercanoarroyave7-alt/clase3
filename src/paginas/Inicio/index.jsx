
// PÁGINA: INICIO
// Pantalla principal después del login.

import { Link } from "react-router-dom";

import Alerta from "../../componentes/comunes/Alerta";
import Cargando from "../../componentes/comunes/Cargando";

import { usarAutenticacion } from "../../hooks/usarAutenticacion";
import { usarContactos } from "../../hooks/usarContactos";

import {
  PERMISOS,
  etiquetaDelRol,
} from "../../utilidades/roles";

function PaginaInicio() {
  const { usuario, tienePermiso } = usarAutenticacion();

  const { contactos, cargando, error } = usarContactos();

  const puedeAdministrar = tienePermiso(
    PERMISOS.VER_PANEL_ADMIN
  );

  return (
    <section className="pagina">
      <header className="pagina__cabecera">
        <h2 className="pagina__titulo">
          Hola, {usuario?.nombre} 
        </h2>

        <p className="pagina__descripcion">
          Bienvenido a tu agenda de contactos.{" "}
          
        </p>
      </header>

      {error && <Alerta tipo="error">{error}</Alerta>}

      {cargando ? (
        <Cargando texto="Cargando contactos..." />
      ) : (
        <div className="tarjetas-resumen">
          <article className="tarjeta-resumen">
            <span className="tarjeta-resumen__numero">
              {contactos.length}
            </span>

            <span className="tarjeta-resumen__etiqueta">
              Contactos en la agenda
            </span>
          </article>

          <article className="tarjeta-resumen">
            <span className="tarjeta-resumen__numero">
              {etiquetaDelRol(usuario?.rol)}
            </span>

            <span className="tarjeta-resumen__etiqueta">
              Tu rol 
            </span>
          </article>

          
        </div>
      )}

      <div className="pagina__acciones">
  {/* Buscar contactos aparece SOLO para usuarios estándar */}
  {!puedeAdministrar && (
    <Link className="boton boton--primario" to="/busqueda">
      Buscar contactos
    </Link>
  )}

  {/* Administración aparece SOLO para administradores */}
  {puedeAdministrar && (
    <Link
      className="boton boton--secundario"
      to="/administrador"
    >
      Ir a administración
    </Link>
  )}
</div>

      {!puedeAdministrar && (
        <Alerta tipo="info">
          Como usuario estándar puedes consultar y buscar
          contactos. Crear o eliminar contactos está reservado
          al administrador.
        </Alerta>
      )}
      {puedeAdministrar && (
        <Alerta tipo="info">
          Como administrador puedes crear, consultar, buscar pero en
           la misma pagina de administración y
          eliminar contactos.
        </Alerta>
      ) }
    </section>
  );
}

export default PaginaInicio;
