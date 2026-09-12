// ==========================================
// FORMULARIO DE INICIO DE SESIÓN
// ==========================================
// Correo y contraseña, ambos inputs controlados.
// La página solo lo coloca; la lógica de entrar
// vive aquí y en el contexto.

import { useCallback, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { usarAutenticacion } from "../../hooks/usarAutenticacion";
import { usarFormulario } from "../../hooks/usarFormulario";

import {
  validarCorreo,
  validarContrasenaLogin,
} from "../../utilidades/validaciones";

import { CREDENCIALES_DEMO } from "../../servicios/servicioAutenticacion";

import Alerta from "../comunes/Alerta";
import Boton from "../comunes/Boton";
import Entrada from "../comunes/Entrada";
import EntradaContrasena from "./EntradaContraseña";

const VALORES_INICIALES = {
  correo: "",
  contrasena: "",
};

const ESQUEMA = {
  correo: validarCorreo,
  contrasena: validarContrasenaLogin,
};

function FormularioInicioSesion() {
  const { entrar } = usarAutenticacion();

  const navegar = useNavigate();
  const ubicacion = useLocation();

  // Si llegó aquí por una ruta protegida, lo
  // devolvemos a esa ruta; si no, al inicio.
  const destino = useMemo(
    () => ubicacion.state?.desde || "/inicio",
    [ubicacion.state]
  );

  const mensajeDeRegistro = ubicacion.state?.mensaje || "";

  const alEnviar = useCallback(
    async (valores) => {
      await entrar({
        correo: valores.correo,
        contrasena: valores.contrasena,
      });

      // Login exitoso -> a la pantalla principal.
      navegar(destino, { replace: true });
    },
    [entrar, navegar, destino]
  );

  const {
    enviando,
    mensaje,
    enviar,
    propiedadesCampo,
  } = usarFormulario({
    valoresIniciales: VALORES_INICIALES,
    esquema: ESQUEMA,
    alEnviar,
  });

  const campoCorreo = propiedadesCampo("correo");
  const campoContrasena = propiedadesCampo("contrasena");

  return (
    <form className="formulario" onSubmit={enviar} noValidate>
      <h2 className="formulario__titulo">Iniciar sesión</h2>

      <p className="formulario__subtitulo">
        Entra con tu correo y contraseña.
      </p>

      {/* Mensaje que trae la pantalla de registro */}
      {mensajeDeRegistro && !mensaje && (
        <Alerta tipo="exito">{mensajeDeRegistro}</Alerta>
      )}

      {/* Error general: credenciales incorrectas */}
      {mensaje && (
        <Alerta tipo={mensaje.tipo}>{mensaje.texto}</Alerta>
      )}

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
        placeholder="Tu contraseña"
        autoComplete="current-password"
        nombre={campoContrasena.nombre}
        valor={campoContrasena.valor}
        error={campoContrasena.error}
        onChange={campoContrasena.onChange}
        onBlur={campoContrasena.onBlur}
      />

      <Boton
        tipo="submit"
        anchoCompleto
        cargando={enviando}
        textoCargando="Ingresando..."
      >
        Ingresar
      </Boton>

      <p className="formulario__pie">
        ¿No tienes cuenta?{" "}
        <Link to="/registro">Regístrate aquí</Link>
      </p>

      
    </form>
  );
}

export default FormularioInicioSesion;
