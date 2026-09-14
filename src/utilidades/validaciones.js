
// VALIDACIONES

// Un validador por campo. Cada uno recibe el
// valor y devuelve el mensaje de error, o ""
// si el campo es válido.
//
// Todos usan .trim() para que los espacios en
// blanco no pasen como contenido válido.

export const REGLAS = {
  NOMBRE: { MINIMO: 3, MAXIMO: 50 },
  CONTRASENA: { MINIMO: 6, MAXIMO: 40 },
  TELEFONO: { MINIMO: 7, MAXIMO: 15 },
  CORREO: { MAXIMO: 80 },
};

// lo que debe tener correo
const EXPRESION_CORREO = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;

const SOLO_NUMEROS = /^[0-9]+$/;


// NOMBRE 
// todo sobre nombre minimo 3 letras 
export function validarNombre(valor = "") {
  const texto = valor.trim();

  if (!texto) {
    return "El nombre es obligatorio.";
  }

  if (texto.length < REGLAS.NOMBRE.MINIMO) {
    return `El nombre debe tener al menos ${REGLAS.NOMBRE.MINIMO} caracteres.`;
  }

  if (texto.length > REGLAS.NOMBRE.MAXIMO) {
    return `El nombre no puede pasar de ${REGLAS.NOMBRE.MAXIMO} caracteres.`;
  }

  return "";
}


// CORREO 
// sobre correo 

export function validarCorreo(valor = "") {
  const texto = valor.trim();

  if (!texto) {
    return "El correo es obligatorio.";
  }

  if (texto.length > REGLAS.CORREO.MAXIMO) {
    return `El correo no puede pasar de ${REGLAS.CORREO.MAXIMO} caracteres.`;
  }

  if (!EXPRESION_CORREO.test(texto)) {
    return "Escribe un correo válido, por ejemplo nombre@correo.com";
  }

  return "";
}


// CONTRASEÑA

export function validarContrasena(valor = "") {
  // La contraseña no se recorta: un espacio
  // en medio es parte de la clave. Pero una
  // clave de solo espacios no vale.
  if (!valor || !valor.trim()) {
    return "La contraseña es obligatoria.";
  }

  if (valor.length < REGLAS.CONTRASENA.MINIMO) {
    return `La contraseña debe tener al menos ${REGLAS.CONTRASENA.MINIMO} caracteres.`;
  }

  if (valor.length > REGLAS.CONTRASENA.MAXIMO) {
    return `La contraseña no puede pasar de ${REGLAS.CONTRASENA.MAXIMO} caracteres.`;
  }

  return "";
}


// CONTRASEÑA EN EL LOGIN
// Al entrar no pedimos longitud mínima: eso se
// exige al registrarse. Aquí solo que no venga
// vacía, el resto lo decide el servicio.

export function validarContrasenaLogin(valor = "") {
  if (!valor || !valor.trim()) {
    return "La contraseña es obligatoria.";
  }

  return "";
}


// CONFIRMAR CONTRASEÑA


export function validarConfirmacion(valor = "", valores = {}) {
  if (!valor) {
    return "Confirma la contraseña.";
  }

  if (valor !== valores.contrasena) {
    return "Las contraseñas no coinciden.";
  }

  return "";
}


// TELÉFONO

export function validarTelefono(valor = "") {
  const texto = valor.trim();

  if (!texto) {
    return "El teléfono es obligatorio.";
  }

  if (!SOLO_NUMEROS.test(texto)) {
    return "El teléfono solo puede tener números.";
  }

  if (texto.length < REGLAS.TELEFONO.MINIMO) {
    return `El teléfono debe tener al menos ${REGLAS.TELEFONO.MINIMO} dígitos.`;
  }

  if (texto.length > REGLAS.TELEFONO.MAXIMO) {
    return `El teléfono no puede pasar de ${REGLAS.TELEFONO.MAXIMO} dígitos.`;
  }

  return "";
}


// ETIQUETA (campo opcional)


export function validarEtiqueta(valor = "") {
  const texto = valor.trim();

  if (texto && texto.length > 20) {
    return "La etiqueta no puede pasar de 20 caracteres.";
  }

  return "";
}

// VALIDAR UN CAMPO DEL ESQUEMA
// esquema = { nombre: validarNombre, ... }

export function validarCampo(campo, valores, esquema) {
  const validador = esquema[campo];

  if (typeof validador !== "function") {
    return "";
  }

  return validador(valores[campo], valores);
}


// VALIDAR TODO EL FORMULARIO

export function validarFormulario(valores, esquema) {
  const errores = {};

  Object.keys(esquema).forEach((campo) => {
    const mensaje = validarCampo(campo, valores, esquema);

    if (mensaje) {
      errores[campo] = mensaje;
    }
  });

  return errores;
}


// ¿HAY ERRORES?
// contiene al menos un mensaje activo ,
//  devolviendo un valor booleano ( trueo false).
export function hayErrores(errores) {
  return Object.values(errores).some(Boolean);
}
