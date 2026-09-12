// ==========================================
// HOOK: usarFormulario
// ==========================================
// Maneja valores, errores, campos tocados y
// estado de envío de CUALQUIER formulario.
//
// Gracias a esto la validación se comporta
// igual en login, registro y contactos: no
// hay reglas copiadas en cada formulario.

import { useCallback, useMemo, useState } from "react";

import {
  validarFormulario,
  hayErrores,
} from "../utilidades/validaciones";

// Solo mostramos el error de un campo cuando el
// usuario ya pasó por él (o al intentar enviar).
function filtrarVisibles(errores, tocados) {
  const visibles = {};

  Object.keys(errores).forEach((campo) => {
    if (tocados[campo]) {
      visibles[campo] = errores[campo];
    }
  });

  return visibles;
}

function marcarTodos(valores) {
  return Object.keys(valores).reduce(
    (acumulado, campo) => ({ ...acumulado, [campo]: true }),
    {}
  );
}

export function usarFormulario({
  valoresIniciales,
  esquema,
  alEnviar,
}) {
  const [valores, setValores] = useState(valoresIniciales);
  const [errores, setErrores] = useState({});
  const [tocados, setTocados] = useState({});
  const [enviando, setEnviando] = useState(false);

  // { tipo: "exito" | "error", texto: string }
  const [mensaje, setMensaje] = useState(null);

  // ==========================================
  // CAMBIAR UN CAMPO
  // ==========================================

  const cambiar = useCallback(
    (campo) => (evento) => {
      const valor =
        evento && evento.target
          ? evento.target.value
          : evento;

      const siguientes = { ...valores, [campo]: valor };

      setValores(siguientes);

      // Al escribir, el mensaje general anterior
      // ya no aplica.
      setMensaje(null);

      setErrores(
        filtrarVisibles(
          validarFormulario(siguientes, esquema),
          tocados
        )
      );
    },
    [valores, tocados, esquema]
  );

  // ==========================================
  // SALIR DE UN CAMPO
  // ==========================================

  const tocar = useCallback(
    (campo) => () => {
      const siguientesTocados = { ...tocados, [campo]: true };

      setTocados(siguientesTocados);

      setErrores(
        filtrarVisibles(
          validarFormulario(valores, esquema),
          siguientesTocados
        )
      );
    },
    [valores, tocados, esquema]
  );

  // ==========================================
  // REINICIAR
  // ==========================================

  const reiniciar = useCallback(() => {
    setValores(valoresIniciales);
    setErrores({});
    setTocados({});
  }, [valoresIniciales]);

  // ==========================================
  // ENVIAR
  // ==========================================

  const enviar = useCallback(
    async (evento) => {
      if (evento) {
        evento.preventDefault();
      }

      const todosLosErrores = validarFormulario(valores, esquema);

      // Al intentar enviar se muestran todos los
      // errores, aunque el campo no se haya tocado.
      setTocados(marcarTodos(valores));
      setErrores(todosLosErrores);

      if (hayErrores(todosLosErrores)) {
        setMensaje({
          tipo: "error",
          texto: "Revisa los campos marcados en rojo.",
        });

        return;
      }

      setMensaje(null);
      setEnviando(true);

      try {
        await alEnviar(valores, { reiniciar, setMensaje });
      } catch (error) {
        setMensaje({
          tipo: "error",
          texto:
            error?.message ||
            "Ocurrió un error inesperado. Intenta de nuevo.",
        });
      } finally {
        setEnviando(false);
      }
    },
    [valores, esquema, alEnviar, reiniciar]
  );

  // ==========================================
  // PROPIEDADES PARA <Entrada />
  // ==========================================

  const propiedadesCampo = useCallback(
    (campo) => ({
      nombre: campo,
      valor: valores[campo],
      error: errores[campo] || "",
      onChange: cambiar(campo),
      onBlur: tocar(campo),
    }),
    [valores, errores, cambiar, tocar]
  );

  const formularioValido = useMemo(
    () => !hayErrores(validarFormulario(valores, esquema)),
    [valores, esquema]
  );

  return {
    valores,
    errores,
    tocados,
    enviando,
    mensaje,
    setMensaje,
    cambiar,
    tocar,
    enviar,
    reiniciar,
    propiedadesCampo,
    formularioValido,
  };
}

export default usarFormulario;
