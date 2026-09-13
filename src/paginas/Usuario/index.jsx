// ==========================================
// PÁGINA: USUARIO
// ==========================================
// Datos de la sesión actual y qué puede hacer
// según su rol.

import { usarAutenticacion } from "../../hooks/usarAutenticacion";

import {
  PERMISOS,
  etiquetaDelRol,
  permisosDelRol,
} from "../../utilidades/roles";

const NOMBRES_PERMISO = {
  [PERMISOS.VER_CONTACTOS]: "Ver y buscar contactos",
  [PERMISOS.CREAR_CONTACTO]: "Crear contactos",
  [PERMISOS.ELIMINAR_CONTACTO]: "Eliminar contactos",
  [PERMISOS.VER_USUARIOS]: "Ver usuarios registrados",
  [PERMISOS.VER_PANEL_ADMIN]: "Entrar al panel de administración",
};

function formatearFecha(iso) {
  if (!iso) {
    return "—";
  }

  return new Date(iso).toLocaleString("es-CO");
}

function PaginaUsuario() {
  const { usuario } = usarAutenticacion();

  const permisos = permisosDelRol(usuario?.rol);

  return (
    <section className="pagina">
      <header className="pagina__cabecera">
        <h2 className="pagina__titulo">Mi perfil</h2>

        <p className="pagina__descripcion">
          Información
        </p>
      </header>

      <dl className="ficha">
        <div className="ficha__fila">
          <dt>Nombre</dt>
          <dd>{usuario?.nombre}</dd>
        </div>

        <div className="ficha__fila">
          <dt>Correo</dt>
          <dd>{usuario?.correo}</dd>
        </div>

        <div className="ficha__fila">
          <dt>Rol</dt>
          <dd>{etiquetaDelRol(usuario?.rol)}</dd>
        </div>

        <div className="ficha__fila">
          <dt>Sesión iniciada</dt>
          <dd>{formatearFecha(usuario?.iniciadaEn)}</dd>
        </div>
      </dl>


      <section className="pagina__seccion">
        

        
      </section>
    </section>
  );
}

export default PaginaUsuario;
