// src/components/Buscador.jsx

export default function Buscador({ busqueda, setBusqueda }) {
  return (
    <div className="buscador-container" >
      <h2>Buscador</h2>
      <input
        type="text"
        placeholder="🔍 Buscar por nombre, teléfono, correo o etiqueta..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="input-buscador" style={{ padding:"20px", }}
      />
    </div>
  );
}