
// SERVICIO DE AUTENTICACIÓN
// Login y registro usando localStorage.
//
// NOTA IMPORTANTE:
// La contraseña se guarda codificada en base64,
// que NO es seguridad real: sirve solo para que
// no quede a la vista en el navegador. En un
// proyecto real esto lo hace el backend con un
// hash tipo bcrypt.

import {
  CLAVES,
  leer,
  guardar,
  eliminar,
} from "../utilidades/almacenamiento";

import { ROLES } from "../utilidades/roles";

// Retardo artificial para que se alcance a ver
// el estado "Ingresando..." de los botones.
const RETARDO = 600;

function esperar(ms = RETARDO) {
  return new Promise((resolver) => {
    setTimeout(resolver, ms);
  });
}


// CONTRASEÑAS
// codificación y verificación de contraseñas
function codificar(contrasena) {
  return btoa(
    encodeURIComponent(contrasena)
  );
}

function coincide(contrasena, codificada) {
  return codificar(contrasena) === codificada;
}

// USUARIO SEMILLA
// Sin esto no habría con qué entrar la
// primera vez que se abre la app. bueno donde no tubiera la
// opcion en registros

const USUARIO_SEMILLA = {
  id: "usuario-administrador",
  nombre: "Administrador",
  correo: "admin@agenda.com",
  contrasena: codificar("Admin123"),
  rol: ROLES.ADMINISTRADOR,
  creadoEn: "2026-01-01T00:00:00.000Z",
};

export const CREDENCIALES_DEMO = {
  correo: USUARIO_SEMILLA.correo,
  contrasena: "Admin123",
};


// LISTA DE USUARIOS
// gestionar la persistencia de usuarios en el 
// almacenamiento local (como localStorage)
function obtenerUsuarios() {
  const usuarios = leer(CLAVES.USUARIOS, null);

  if (!Array.isArray(usuarios) || usuarios.length === 0) {
    guardar(CLAVES.USUARIOS, [USUARIO_SEMILLA]);
    return [USUARIO_SEMILLA];
  }

  return usuarios;
}

function guardarUsuarios(usuarios) {
  guardar(CLAVES.USUARIOS, usuarios);
}

function normalizarCorreo(correo = "") {
  return correo.trim().toLowerCase();
}

// Quita la contraseña antes de que el usuario
// salga del servicio hacia la interfaz.
function sinContrasena(usuario) {
  const { contrasena, ...publico } = usuario;
  void contrasena;
  return publico;
}


// REGISTRAR
// registro de un nuevo usuario

export async function registrar({
  nombre,
  correo,
  contrasena,
  rol = ROLES.USUARIO,
}) {
  await esperar();

  const usuarios = obtenerUsuarios();
  const correoLimpio = normalizarCorreo(correo);

  const yaExiste = usuarios.some(
    (usuario) =>
      normalizarCorreo(usuario.correo) === correoLimpio
  );

  if (yaExiste) {
    throw new Error(
      "Ese correo ya está registrado. Inicia sesión o usa otro."
    );
  }

  const nuevoUsuario = {
    id: crypto.randomUUID(),
    nombre: nombre.trim(),
    correo: correoLimpio,
    contrasena: codificar(contrasena),
    rol,
    creadoEn: new Date().toISOString(),
  };

  guardarUsuarios([...usuarios, nuevoUsuario]);

  return sinContrasena(nuevoUsuario);
}


// INICIAR SESIÓN
export async function iniciarSesion({ correo, contrasena }) {
  await esperar();

  const usuarios = obtenerUsuarios();
  const correoLimpio = normalizarCorreo(correo);

  const usuario = usuarios.find(
    (registro) =>
      normalizarCorreo(registro.correo) === correoLimpio
  );

  // Mismo mensaje si falla el correo o la
  // contraseña: así no se filtra qué correos
  // están registrados.
  if (!usuario || !coincide(contrasena, usuario.contrasena)) {
    throw new Error(
      "El correo o la contraseña no coinciden."
    );
  }

  const sesion = {
    ...sinContrasena(usuario),
    iniciadaEn: new Date().toISOString(),
  };

  guardar(CLAVES.SESION, sesion);

  return sesion;
}


// CERRAR SESIÓN

export function cerrarSesion() {
  eliminar(CLAVES.SESION);
}


// SESIÓN ACTUAL
export function obtenerSesion() {
  const sesion = leer(CLAVES.SESION, null);

  if (!sesion || !sesion.correo || !sesion.rol) {
    return null;
  }

  return sesion;
}


// LISTAR USUARIOS (solo para el panel admin)
export function listarUsuarios() {
  return obtenerUsuarios().map(sinContrasena);
}
