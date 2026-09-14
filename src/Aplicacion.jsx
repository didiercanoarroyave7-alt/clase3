
// APLICACIÓN
// Sin lógica de negocio: solo arma el contexto
// de sesión y entrega las rutas.

import { ProveedorAutenticacion } from "./contexto/ContextoAutenticacion";
import RutasAplicacion from "./rutas/RutasAplicacion";

function Aplicacion() {
  return (
    <ProveedorAutenticacion>
      <RutasAplicacion />
    </ProveedorAutenticacion>
  );
}

export default Aplicacion;
