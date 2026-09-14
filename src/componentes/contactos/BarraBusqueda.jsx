
// BARRA DE BÚSQUEDA
// Input controlado + orden + tamaño de página.
// Busca por nombre, correo, teléfono o etiqueta
// y no distingue mayúsculas de minúsculas
// (eso lo resuelve usarContactos).

const OPCIONES_POR_PAGINA = [2, 4, 6, 8];

function BarraBusqueda({
  busqueda,
  setBusqueda,
  ordenAsc,
  setOrdenAsc,
  contactosPorPagina,
  setContactosPorPagina,
}) {
  return (
    <div className="barra-busqueda">
      <input
        type="search"
        className="barra-busqueda__entrada"
        placeholder="Buscar por nombre, correo, teléfono o etiqueta..."
        value={busqueda}
        onChange={(evento) => setBusqueda(evento.target.value)}
        aria-label="Buscar contactos"
      />

      <button
        type="button"
        className="boton boton--secundario"
        onClick={() => setOrdenAsc((previo) => !previo)}
      >
        {ordenAsc ? "Ordenar A-Z" : "Ordenar Z-A"}
      </button>

      <select
        className="barra-busqueda__select"
        value={contactosPorPagina}
        onChange={(evento) =>
          setContactosPorPagina(Number(evento.target.value))
        }
        aria-label="Contactos por página"
      >
        {OPCIONES_POR_PAGINA.map((cantidad) => (
          <option key={cantidad} value={cantidad}>
            {cantidad} por página
          </option>
        ))}
      </select>

      {busqueda && (
        <button
          type="button"
          className="barra-busqueda__limpiar"
          onClick={() => setBusqueda("")}
        >
          Limpiar
        </button>
      )}
    </div>
  );
}

export default BarraBusqueda;
