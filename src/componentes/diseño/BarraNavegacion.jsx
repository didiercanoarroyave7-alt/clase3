// ==========================================
// BARRA DE NAVEGACIÓN
// ==========================================
// Muestra quién está conectado, su rol y el
// botón de cerrar sesión.

import { useNavigate } from "react-router-dom";

import { usarAutenticacion } from "../../hooks/usarAutenticacion";
import { etiquetaDelRol, ROLES } from "../../utilidades/roles";

import Boton from "../comunes/Boton";

function BarraNavegacion({ alAlternarMenu }) {
  const { usuario, salir } = usarAutenticacion();

  const navegar = useNavigate();

  const manejarSalir = () => {
    salir();
    navegar("/inicio-sesion", { replace: true });
  };

  const claseInsignia =
    usuario?.rol === ROLES.ADMINISTRADOR
      ? "insignia insignia--admin"
      : "insignia insignia--usuario";

  return (
    <header className="barra-navegacion">
      <button
        type="button"
        className="barra-navegacion__menu"
        onClick={alAlternarMenu}
        aria-label="Abrir o cerrar el menú"
      >
        ☰
      </button>

      <h1 className="barra-navegacion__marca">
        Agenda de Contactos
      </h1>

      <div className="barra-navegacion__usuario">
        <div className="barra-navegacion__datos">
          <span className="barra-navegacion__nombre">
            {usuario?.nombre}
          </span>

          {/* El rol viene de la sesión guardada */}
          <span className={claseInsignia}>
            {etiquetaDelRol(usuario?.rol)}
          </span>
        </div>

        <Boton variante="secundario" onClick={manejarSalir}>
          Cerrar sesión
        </Boton>
      </div>
    </header>
  );
}

export default BarraNavegacion;
