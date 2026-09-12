// ==========================================
// ROLES Y PERMISOS
// ==========================================
// Los roles del sistema y qué puede hacer
// cada uno. Toda la app pregunta aquí,
// nunca compara strings suelto.

export const ROLES = {
  ADMINISTRADOR: "administrador",
  USUARIO: "usuario",
};

export const ETIQUETAS_ROL = {
  [ROLES.ADMINISTRADOR]: "Administrador",
  [ROLES.USUARIO]: "Usuario estándar",
};

// ==========================================
// PERMISOS
// ==========================================

export const PERMISOS = {
  VER_CONTACTOS: "contactos:ver",
  CREAR_CONTACTO: "contactos:crear",
  ELIMINAR_CONTACTO: "contactos:eliminar",
  VER_USUARIOS: "usuarios:ver",
  VER_PANEL_ADMIN: "panel:administrador",
};

const PERMISOS_POR_ROL = {
  [ROLES.ADMINISTRADOR]: [
    PERMISOS.VER_CONTACTOS,
    PERMISOS.CREAR_CONTACTO,
    PERMISOS.ELIMINAR_CONTACTO,
    PERMISOS.VER_USUARIOS,
    PERMISOS.VER_PANEL_ADMIN,
  ],

  [ROLES.USUARIO]: [
    PERMISOS.VER_CONTACTOS,
  ],
};

// ==========================================
// CONSULTAS
// ==========================================

export function esRolValido(rol) {
  return Object.values(ROLES).includes(rol);
}

export function esAdministrador(rol) {
  return rol === ROLES.ADMINISTRADOR;
}

export function permisosDelRol(rol) {
  return PERMISOS_POR_ROL[rol] || [];
}

export function rolTienePermiso(rol, permiso) {
  return permisosDelRol(rol).includes(permiso);
}

export function etiquetaDelRol(rol) {
  return ETIQUETAS_ROL[rol] || "Sin rol";
}
