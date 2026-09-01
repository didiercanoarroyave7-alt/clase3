function Buscador({ busqueda, setBusqueda }) {
  return (
    <input
      type="text"
      placeholder="Buscar contacto..."
      value={busqueda}
      onChange={(e) => setBusqueda(e.target.value)}
    />
  );
}

export default Buscador;
