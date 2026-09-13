// ==========================================
// ENTRADA
// ==========================================
// Input controlado con etiqueta, borde rojo,
// ícono de error y mensaje debajo del campo.
//
// Todos los formularios del proyecto usan este
// componente, así el feedback de error se ve
// igual en cualquier pantalla.

function Entrada({
  nombre,
  etiqueta,
  tipo = "text",
  valor = "",
  onChange,
  onBlur,
  error = "",
  placeholder = "",
  autoComplete,
  ayuda = "",
  accion = null,
  ...resto
}) {
  const conError = Boolean(error);

  const idCampo = `campo-${nombre}`;
  const idError = `${idCampo}-error`;

  return (
    <div className="campo">
      {etiqueta && (
        <label className="campo__etiqueta" htmlFor={idCampo}>
          {etiqueta}
        </label>
      )}

      <div
        className={
          conError
            ? "campo__caja campo__caja--error"
            : "campo__caja"
        }
      >
        <input
          id={idCampo}
          name={nombre}
          className="campo__entrada"
          type={tipo}
          value={valor}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={conError}
          aria-describedby={conError ? idError : undefined}
          {...resto}
        />

        {/* Ícono rojo de error */}
        {conError && (
          <span className="campo__icono" aria-hidden="true">
            ⚠
          </span>
        )}

        {/* Espacio para el ojito de la contraseña */}
        {accion && (
          <span className="campo__accion">{accion}</span>
        )}
      </div>

      {/* MENSAJE DEBAJO DEL CAMPO */}
      {conError ? (
        <p className="campo__error" id={idError} role="alert">
          {error}
        </p>
      ) : (
        ayuda && <p className="campo__ayuda">{ayuda}</p>
      )}
    </div>
  );
}

export default Entrada;
