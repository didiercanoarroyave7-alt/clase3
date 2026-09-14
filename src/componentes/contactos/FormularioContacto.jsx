// FORMULARIO DE CONTACTO
// Usa el mismo hook y los mismos componentes
// que el login y el registro, así la validación
// se ve igual en todo el proyecto.

import { useCallback } from "react";

import { usarFormulario } from "../../hooks/usarFormulario";

import {
  validarNombre,
  validarCorreo,
  validarTelefono,
  validarEtiqueta,
} from "../../utilidades/validaciones";

import Alerta from "../comunes/Alerta";
import Boton from "../comunes/Boton";
import Entrada from "../comunes/Entrada";

const VALORES_INICIALES = {
  nombre: "",
  telefono: "",
  email: "",
  etiqueta: "",
};

const ESQUEMA = {
  nombre: validarNombre,
  telefono: validarTelefono,
  email: validarCorreo,
  etiqueta: validarEtiqueta,
};

function FormularioContacto({ onAgregar, correoRepetido }) {
  const alEnviar = useCallback(
    async (valores, { reiniciar, setMensaje }) => {
      // El correo no puede estar dos veces en
      // la agenda.
      if (correoRepetido && correoRepetido(valores.email)) {
        throw new Error(
          "Ya existe un contacto con ese correo."
        );
      }

      await onAgregar({
        nombre: valores.nombre.trim(),
        telefono: valores.telefono.trim(),
        email: valores.email.trim().toLowerCase(),
        etiqueta: valores.etiqueta.trim(),
      });

      reiniciar();

      setMensaje({
        tipo: "exito",
        texto: "Contacto agregado correctamente.",
      });
    },
    [onAgregar, correoRepetido]
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

  const campoNombre = propiedadesCampo("nombre");
  const campoTelefono = propiedadesCampo("telefono");
  const campoEmail = propiedadesCampo("email");
  const campoEtiqueta = propiedadesCampo("etiqueta");

  return (
    <form
      className="formulario formulario--rejilla"
      onSubmit={enviar}
      noValidate
    >
      <h2 className="formulario__titulo">
        Agregar contacto
      </h2>

      {mensaje && (
        <Alerta tipo={mensaje.tipo}>{mensaje.texto}</Alerta>
      )}

      <Entrada
        etiqueta="Nombre"
        placeholder="Juan Pérez"
        nombre={campoNombre.nombre}
        valor={campoNombre.valor}
        error={campoNombre.error}
        onChange={campoNombre.onChange}
        onBlur={campoNombre.onBlur}
      />

      <Entrada
        etiqueta="Teléfono"
        tipo="tel"
        placeholder="3001234567"
        nombre={campoTelefono.nombre}
        valor={campoTelefono.valor}
        error={campoTelefono.error}
        onChange={campoTelefono.onChange}
        onBlur={campoTelefono.onBlur}
      />

      <Entrada
        etiqueta="Correo"
        tipo="email"
        placeholder="juan@correo.com"
        nombre={campoEmail.nombre}
        valor={campoEmail.valor}
        error={campoEmail.error}
        onChange={campoEmail.onChange}
        onBlur={campoEmail.onBlur}
      />

      <Entrada
        etiqueta="Etiqueta (opcional)"
        placeholder="Familia, trabajo..."
        nombre={campoEtiqueta.nombre}
        valor={campoEtiqueta.valor}
        error={campoEtiqueta.error}
        onChange={campoEtiqueta.onChange}
        onBlur={campoEtiqueta.onBlur}
      />

      <div className="formulario__acciones">
        <Boton
          tipo="submit"
          anchoCompleto
          cargando={enviando}
          textoCargando="Guardando..."
        >
          Agregar contacto
        </Boton>
      </div>
    </form>
  );
}

export default FormularioContacto;
