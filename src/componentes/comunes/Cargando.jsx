// ==========================================
// CARGANDO
// ==========================================

function Cargando({ texto = "Cargando...", pantallaCompleta = false }) {
  return (
    <div
      className={
        pantallaCompleta
          ? "cargando cargando--pantalla"
          : "cargando"
      }
      role="status"
      aria-live="polite"
    >
      <span className="cargando__rueda" aria-hidden="true" />
      <p className="cargando__texto">{texto}</p>
    </div>
  );
}

export default Cargando;
