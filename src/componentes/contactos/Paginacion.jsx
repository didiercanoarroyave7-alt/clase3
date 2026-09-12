// ==========================================
// PAGINACIÓN
// ==========================================

function Paginacion({ paginaActual, totalPaginas, alCambiar }) {
  if (totalPaginas <= 0) {
    return null;
  }

  const paginas = Array.from(
    { length: totalPaginas },
    (_, indice) => indice + 1
  );

  return (
    <nav className="paginacion" aria-label="Paginación">
      <button
        type="button"
        disabled={paginaActual === 1}
        onClick={() => alCambiar(paginaActual - 1)}
      >
        ← Anterior
      </button>

      {paginas.map((numero) => (
        <button
          type="button"
          key={numero}
          className={numero === paginaActual ? "activo" : ""}
          aria-current={
            numero === paginaActual ? "page" : undefined
          }
          onClick={() => alCambiar(numero)}
        >
          {numero}
        </button>
      ))}

      <button
        type="button"
        disabled={paginaActual === totalPaginas}
        onClick={() => alCambiar(paginaActual + 1)}
      >
        Siguiente →
      </button>
    </nav>
  );
}

export default Paginacion;
