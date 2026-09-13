// ==========================================
// CONTEXTO DE AUTENTICACIÓN
// ==========================================
// Guarda el usuario de la sesión (con su rol)
// y expone las acciones de entrar, registrarse
// y salir para toda la aplicación.

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  iniciarSesion as iniciarSesionServicio,
  registrar as registrarServicio,
  cerrarSesion as cerrarSesionServicio,
  obtenerSesion,
} from "../servicios/servicioAutenticacion";

import {
  esAdministrador,
  rolTienePermiso,
} from "../utilidades/roles";

export const ContextoAutenticacion = createContext(null);

export function ProveedorAutenticacion({ children }) {
  // Usuario de la sesión actual (null = nadie).
  const [usuario, setUsuario] = useState(null);

  // true mientras se revisa si ya había sesión
  // guardada. Evita el parpadeo que manda al
  // login a alguien que sí estaba logueado.
  const [cargandoSesion, setCargandoSesion] = useState(true);

  // ==========================================
  // RECUPERAR SESIÓN GUARDADA
  // ==========================================

  useEffect(() => {
    setUsuario(obtenerSesion());
    setCargandoSesion(false);
  }, []);

  // ==========================================
  // ENTRAR
  // ==========================================

  const entrar = useCallback(async (credenciales) => {
    const sesion = await iniciarSesionServicio(credenciales);
    setUsuario(sesion);
    return sesion;
  }, []);

  // ==========================================
  // REGISTRARSE
  // ==========================================
  // Registra pero NO inicia sesión: el usuario
  // vuelve al login, como pide el flujo.

  const registrarse = useCallback(async (datos) => {
    return registrarServicio(datos);
  }, []);

  // ==========================================
  // SALIR
  // ==========================================

  const salir = useCallback(() => {
    cerrarSesionServicio();
    setUsuario(null);
  }, []);

  // ==========================================
  // PERMISOS
  // ==========================================

  const tienePermiso = useCallback(
    (permiso) => {
      if (!usuario) {
        return false;
      }

      return rolTienePermiso(usuario.rol, permiso);
    },
    [usuario]
  );

  const valor = useMemo(
    () => ({
      usuario,
      cargandoSesion,
      autenticado: Boolean(usuario),
      rol: usuario?.rol ?? null,
      esAdmin: esAdministrador(usuario?.rol),
      entrar,
      registrarse,
      salir,
      tienePermiso,
    }),
    [
      usuario,
      cargandoSesion,
      entrar,
      registrarse,
      salir,
      tienePermiso,
    ]
  );

  return (
    <ContextoAutenticacion.Provider value={valor}>
      {children}
    </ContextoAutenticacion.Provider>
  );
}
