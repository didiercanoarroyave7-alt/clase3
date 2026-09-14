// 
// ENTRADA DE CONTRASEÑA
// 
// Reutiliza <Entrada /> y le agrega el botón
// para mostrar u ocultar la contraseña.

import { useState } from "react";

import Entrada from "../comunes/Entrada";

function EntradaContrasena({
  etiqueta = "Contraseña",
  autoComplete = "current-password",
  ...resto
}) {
  const [visible, setVisible] = useState(false);

  return (
    <Entrada
      etiqueta={etiqueta}
      tipo={visible ? "text" : "password"}
      autoComplete={autoComplete}
      accion={
        <button
          type="button"
          className="ojo"
          onClick={() => setVisible((previo) => !previo)}
          aria-label={
            visible
              ? "Ocultar contraseña"
              : "Mostrar contraseña"
          }
        >
          {visible ? "ocultar" : "ver"}
        </button>
      }
      {...resto}
    />
  );
}

export default EntradaContrasena;
