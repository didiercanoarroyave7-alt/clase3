// ==========================================
// PÁGINA: INICIO DE SESIÓN
// ==========================================
// La página solo decide el marco y a dónde
// mandar al que ya está logueado. El formulario
// hace el trabajo.

import { Navigate } from "react-router-dom";

import FormularioInicioSesion from "../../componentes/autenticacion/FormularioInicioSesion";
import Cargando from "../../componentes/comunes/Cargando";
import { usarAutenticacion } from "../../hooks/usarAutenticacion";

function PaginaInicioSesion() {
  const { autenticado, cargandoSesion } = usarAutenticacion();

  if (cargandoSesion) {
    return <Cargando texto="Verificando sesión..." pantallaCompleta />;
  }

  // Si ya hay sesión, no tiene sentido el login.
  if (autenticado) {
    return <Navigate to="/inicio" replace />;
  }

  return (
    <div className="pantalla-autenticacion">
      <div className="tarjeta-autenticacion">
        <FormularioInicioSesion />
      </div>
    </div>
  );
}

export default PaginaInicioSesion;
