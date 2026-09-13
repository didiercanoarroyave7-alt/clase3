// ==========================================
// BARRA LATERAL
// ==========================================
// El menú se arma según el rol: las opciones
// que el usuario no puede usar no se pintan.

import { NavLink } from "react-router-dom";

import { usarAutenticacion } from "../../hooks/usarAutenticacion";
import { PERMISOS } from "../../utilidades/roles";

const ENLACES = [
  {
    a: "/inicio",
    etiqueta: "Inicio",
    icono: "🏠",
    permiso: null,
  },
  {
    a: "/busqueda",
    etiqueta: "Buscar contactos",
    icono: "🔍",
    permiso: PERMISOS.VER_CONTACTOS,
  },
  {
    a: "/usuario",
    etiqueta: "Mi perfil",
    icono: "👤",
    permiso: null,
  },
  {
    a: "/administrador",
    etiqueta: "Administración",
    icono: "🛠",
    permiso: PERMISOS.VER_PANEL_ADMIN,
  },
];

function BarraLateral({ abierta, alNavegar }) {
  const { tienePermiso } = usarAutenticacion();

  const enlacesVisibles = ENLACES.filter(
    (enlace) => !enlace.permiso || tienePermiso(enlace.permiso)
  );

  return (
    <aside
      className={
        abierta
          ? "barra-lateral barra-lateral--abierta"
          : "barra-lateral"
      }
    >
      <nav className="barra-lateral__nav">
        {enlacesVisibles.map((enlace) => (
          <NavLink
            key={enlace.a}
            to={enlace.a}
            onClick={alNavegar}
            className={({ isActive }) =>
              isActive
                ? "barra-lateral__enlace barra-lateral__enlace--activo"
                : "barra-lateral__enlace"
            }
          >
            <span aria-hidden="true">{enlace.icono}</span>
            {enlace.etiqueta}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default BarraLateral;
