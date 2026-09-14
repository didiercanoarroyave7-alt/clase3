
// RUTA PROTEGIDA

// Envuelve una ruta y decide tres cosas:
//
// 1. Sin sesión           -> manda al login
// 2. Con sesión, sin rol  -> mensaje claro de
//                            "no tienes permiso"
// 3. Todo bien            -> pinta la página

import { Link, Navigate, useLocation } from "react-router-dom";

import { usarAutenticacion } from "../../hooks/usarAutenticacion";
import { etiquetaDelRol } from "../../utilidades/roles";

import Alerta from "./Alerta";
import Cargando from "./Cargando";

function SinPermiso({ rol }) {
  return (
    <div className="sin-permiso">
      <Alerta tipo="advertencia">
        No tienes permiso para entrar a esta sección. Tu rol
        actual es <strong>{etiquetaDelRol(rol)}</strong>.
      </Alerta>

      <Link className="boton boton--secundario" to="/inicio">
        Volver al inicio
      </Link>
    </div>
  );
}

function RutaProtegida({
  children,
  rolesPermitidos = null,
  permiso = null,
}) {
  const {
    usuario,
    cargandoSesion,
    tienePermiso,
  } = usarAutenticacion();

  const ubicacion = useLocation();

  // Todavía no sabemos si hay sesión guardada.
  if (cargandoSesion) {
    return <Cargando texto="Verificando sesión..." pantallaCompleta />;
  }

  // 1. No hay sesión.
  if (!usuario) {
    return (
      <Navigate
        to="/inicio-sesion"
        // Guardamos de dónde venía para devolverlo
        // ahí después de iniciar sesión.
        state={{ desde: ubicacion.pathname }}
        replace
      />
    );
  }

  // 2. Hay sesión pero el rol no alcanza.
  const rolPermitido =
    !rolesPermitidos || rolesPermitidos.includes(usuario.rol);

  const permisoConcedido = !permiso || tienePermiso(permiso);

  if (!rolPermitido || !permisoConcedido) {
    return <SinPermiso rol={usuario.rol} />;
  }

  // 3. Adelante.
  return children;
}

export default RutaProtegida;
