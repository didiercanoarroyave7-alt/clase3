// ==========================================
// DISEÑO
// ==========================================
// Estructura común de las pantallas privadas:
// barra superior + menú lateral + contenido.

import { useState } from "react";
import { Outlet } from "react-router-dom";

import BarraNavegacion from "./BarraNavegacion";
import BarraLateral from "./BarraLateral";

function Diseño() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <div className="diseño">
      <BarraNavegacion
        alAlternarMenu={() =>
          setMenuAbierto((previo) => !previo)
        }
      />

      <div className="diseño__cuerpo">
        <BarraLateral
          abierta={menuAbierto}
          alNavegar={() => setMenuAbierto(false)}
        />

        <main className="diseño__contenido">
          {/* Aquí entra cada página */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Diseño;
