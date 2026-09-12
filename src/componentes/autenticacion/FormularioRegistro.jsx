// ==========================================
// FORMULARIO DE REGISTRO
// ==========================================
// Nombre, correo, contraseña y confirmación.
// Valida que el correo no esté registrado,
// la longitud mínima y que ambas claves
// coincidan.

import { useCallback, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { usarAutenticacion } from "../../hooks/usarAutenticacion";
import { usarFormulario } from "../../hooks/usarFormulario";

import {
  REGLAS,
  validarNombre,
  validarCorreo,
  validarContrasena,
  validarConfirmacion,
} from "../../utilidades/validaciones";

import { ROLES, ETIQUETAS_ROL } from "../../utilidades/roles";

import Alerta from "../comunes/Alerta";
import Boton from "../comunes/Boton";
import Entrada from "../comunes/Entrada";
import EntradaContrasena from "./EntradaContraseña";

const VALORES_INICIALES = {
  nombre: "",
  correo: "",
  contrasena: "",
  confirmacion: "",
  rol: ROLES.USUARIO,
};

const ESQUEMA = {
  nombre: validarNombre,
  correo: validarCorreo,
  contrasena: validarContrasena,
  confirmacion: validarConfirmacion,
};

const MENSAJE_EXITO =
  "¡Cuenta creada! Ya puedes iniciar sesión.";

function FormularioRegistro() {
  const { registrarse } = usarAutenticacion();

  const navegar = useNavigate();

  // Guardamos el temporizador para cancelarlo
  // si el componente se desmonta antes.
  const temporizador = useRef(null);

  useEffect(() => {
    return () => {
      if (temporizador.current) {
        clearTimeout(temporizador.current);
      }
    };
  }, []);

  const alEnviar = useCallback(
    async (valores, { reiniciar, setMensaje }) => {
      // Si el correo ya existe, el servicio lanza
      // el error y usarFormulario lo muestra.
      await registrarse({
        nombre: valores.nombre,
        correo: valores.correo,
        contrasena: valores.contrasena,
        rol: valores.rol,
      });

      reiniciar();

      setMensaje({ tipo: "exito", texto: MENSAJE_EXITO });

      temporizador.current = setTimeout(() => {
        navegar("/inicio-sesion", {
          state: { mensaje: MENSAJE_EXITO },
          replace: true,
        });
      }, 1600);
    },
    [registrarse, navegar]
  );

  const {
    valores,
    enviando,
    mensaje,
    cambiar,
    enviar,
    propiedadesCampo,
  } = usarFormulario({
    valoresIniciales: VALORES_INICIALES,
    esquema: ESQUEMA,
    alEnviar,
  });

  const campoNombre = propiedadesCampo("nombre");
  const campoCorreo = propiedadesCampo("correo");
  const campoContrasena = propiedadesCampo("contrasena");
  const campoConfirmacion = propiedadesCampo("confirmacion");

  return (
    <form className="formulario" onSubmit={enviar} noValidate>
      <h2 className="formulario__titulo">Crear cuenta</h2>

      <p className="formulario__subtitulo">
        Regístrate para entrar a la agenda.
      </p>

      

      <Entrada
        etiqueta="Nombre completo"
        placeholder="Ana Rodríguez"
        autoComplete="name"
        nombre={campoNombre.nombre}
        valor={campoNombre.valor}
        error={campoNombre.error}
        onChange={campoNombre.onChange}
        onBlur={campoNombre.onBlur}
      />

      <Entrada
        etiqueta="Correo electrónico"
        tipo="email"
        placeholder="nombre@correo.com"
        autoComplete="email"
        nombre={campoCorreo.nombre}
        valor={campoCorreo.valor}
        error={campoCorreo.error}
        onChange={campoCorreo.onChange}
        onBlur={campoCorreo.onBlur}
      />

      <EntradaContrasena
        placeholder="Mínimo 6 caracteres"
        autoComplete="new-password"
        ayuda={`La contraseña debe tener al menos ${REGLAS.CONTRASENA.MINIMO} caracteres.`}
        nombre={campoContrasena.nombre}
        valor={campoContrasena.valor}
        error={campoContrasena.error}
        onChange={campoContrasena.onChange}
        onBlur={campoContrasena.onBlur}
      />

      <EntradaContrasena
        etiqueta="Confirmar contraseña"
        placeholder="Repite la contraseña"
        autoComplete="new-password"
        nombre={campoConfirmacion.nombre}
        valor={campoConfirmacion.valor}
        error={campoConfirmacion.error}
        onChange={campoConfirmacion.onChange}
        onBlur={campoConfirmacion.onBlur}
      />

      {/* ROL DE LA CUENTA */}
      <div className="campo">
        <label className="campo__etiqueta" htmlFor="campo-rol">
          Rol de la cuenta
        </label>

        <div className="campo__caja">
          <select
            id="campo-rol"
            name="rol"
            className="campo__entrada"
            value={valores.rol}
            onChange={cambiar("rol")}
          >
            <option value={ROLES.USUARIO}>
              {ETIQUETAS_ROL[ROLES.USUARIO]}
            </option>

            <option value={ROLES.ISTRADOR}>
              {ETIQUETAS_ROL[ROLES.ADMINISTRADOR]}
            </option>
          </select>
        </div>

        <p className="campo__ayuda">
          El administrador puede crear y eliminar contactos; el
          usuario estándar solo los consulta.
        </p>
      </div>
      {mensaje && (
        <Alerta tipo={mensaje.tipo}>{mensaje.texto}</Alerta>
      )}

      <Boton
        tipo="submit"
        anchoCompleto
        cargando={enviando}
        textoCargando="Creando cuenta..."
      >
        Registrarme
      </Boton>

      <p className="formulario__pie">
        ¿Ya tienes cuenta?{" "}
        <Link to="/inicio-sesion">Inicia sesión</Link>
      </p>
    </form>
  );
}

export default FormularioRegistro;
