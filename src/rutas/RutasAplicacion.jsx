// ==========================================
// RUTAS DE LA APLICACIÓN
// ==========================================
// Rutas públicas (login y registro) y rutas
// privadas dentro del diseño con menú.

import { Link, Navigate, Route, Routes } from "react-router-dom";

import RutaProtegida from "../componentes/comunes/RutaProtegida";
import Diseño from "../componentes/diseño/Diseño";

import PaginaInicioSesion from "../paginas/InicioSesion";
import PaginaRegistro from "../paginas/Registro";
import PaginaInicio from "../paginas/Inicio";
import PaginaBusqueda from "../paginas/Busqueda";
import PaginaAdministrador from "../paginas/Administrador";
import PaginaUsuario from "../paginas/Usuario";

import { ROLES, PERMISOS } from "../utilidades/roles";

function NoEncontrada() {
  return (
    <section className="pagina">
      <h2 className="pagina__titulo">Página no encontrada</h2>

      <p className="pagina__descripcion">
        La dirección que abriste no existe.
      </p>

      <Link className="boton boton--primario" to="/inicio">
        Volver al inicio
      </Link>
    </section>
  );
}

function RutasAplicacion() {
  return (
    <Routes>
      {/* ====================================
          PÚBLICAS
      ==================================== */}

      <Route
        path="/"
        element={<Navigate to="/inicio" replace />}
      />

      <Route
        path="/inicio-sesion"
        element={<PaginaInicioSesion />}
      />

      <Route path="/registro" element={<PaginaRegistro />} />

      {/* ====================================
          PRIVADAS
      ==================================== */}

      <Route
        element={
          <RutaProtegida>
            <Diseño />
          </RutaProtegida>
        }
      >
        <Route path="/inicio" element={<PaginaInicio />} />

        <Route
          path="/busqueda"
          element={
            <RutaProtegida permiso={PERMISOS.VER_CONTACTOS}>
              <PaginaBusqueda />
            </RutaProtegida>
          }
        />

        <Route path="/usuario" element={<PaginaUsuario />} />

        {/* Solo administradores */}
        <Route
          path="/administrador"
          element={
            <RutaProtegida
              rolesPermitidos={[ROLES.ADMINISTRADOR]}
              permiso={PERMISOS.VER_PANEL_ADMIN}
            >
              <PaginaAdministrador />
            </RutaProtegida>
          }
        />

        <Route path="*" element={<NoEncontrada />} />
      </Route>
    </Routes>
  );
}

export default RutasAplicacion;
