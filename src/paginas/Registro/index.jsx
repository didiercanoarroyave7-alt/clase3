// ==========================================
// PÁGINA: REGISTRO
// ==========================================

import { Navigate } from "react-router-dom";

import FormularioRegistro from "../../componentes/autenticacion/FormularioRegistro";
import Cargando from "../../componentes/comunes/Cargando";
import { usarAutenticacion } from "../../hooks/usarAutenticacion";

function PaginaRegistro() {
  const { autenticado, cargandoSesion } = usarAutenticacion();

  if (cargandoSesion) {
    return <Cargando texto="Verificando sesión..." pantallaCompleta />;
  }

  if (autenticado) {
    return <Navigate to="/inicio" replace />;
  }

  return (
    <div className="pantalla-autenticacion">
      <div className="tarjeta-autenticacion">
        <FormularioRegistro />
      </div>
    </div>
  );
}

export default PaginaRegistro;
