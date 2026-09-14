
// ALERTA
// Mensaje general del formulario o de la
// página: éxito, error o información.

function Alerta({ tipo = "info", children, alCerrar }) {
  if (!children) {
    return null;
  }

  const iconos = {
    exito: "✓",
    error: "✕",
    info: "ℹ",
    advertencia: "⚠",
  };

  return (
    <div className={`alerta alerta--${tipo}`} role="alert">
      <span className="alerta__icono" aria-hidden="true">
        {iconos[tipo] || iconos.info}
      </span>

      <span className="alerta__texto">{children}</span>

      {alCerrar && (
        <button
          type="button"
          className="alerta__cerrar"
          onClick={alCerrar}
          aria-label="Cerrar mensaje"
        >
          ×
        </button>
      )}
    </div>
  );
}

export default Alerta;
