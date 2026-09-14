
// ALMACENAMIENTO
// Envoltorio sobre localStorage.
// Centraliza las claves y el JSON.parse/stringify
// para que ningún componente toque
// localStorage directamente.

const PREFIJO = "agenda";

export const CLAVES = {
  USUARIOS: `${PREFIJO}:usuarios`,
  SESION: `${PREFIJO}:sesion`,
};


// LEER 
// utilidad de lectura segura paralocalStorage

export function leer(clave, valorPorDefecto = null) {
  try {
    const crudo = localStorage.getItem(clave);

    if (crudo === null) {
      return valorPorDefecto;
    }

    return JSON.parse(crudo);
  } catch {
    // Si el dato está corrupto, devolvemos el
    // valor por defecto en vez de romper la app.
    return valorPorDefecto;
  }
}


// GUARDAR

export function guardar(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
    return true;
  } catch {
    return false;
  }
}


// ELIMINAR
//  utilidad de eliminación segura paralocalStorage
export function eliminar(clave) {
  try {
    localStorage.removeItem(clave);
    return true;
  } catch {
    return false;
  }
}
