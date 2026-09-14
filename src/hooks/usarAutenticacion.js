
// HOOK: usarAutenticacion
// Atajo para leer el contexto de sesión de inicio.

import { useContext } from "react";

import { ContextoAutenticacion } from "../contexto/ContextoAutenticacion";

export function usarAutenticacion() {
  const contexto = useContext(ContextoAutenticacion);

  if (!contexto) {
    throw new Error(
      "usarAutenticacion debe usarse dentro de <ProveedorAutenticacion>."
    );
  }

  return contexto;
}

export default usarAutenticacion;
