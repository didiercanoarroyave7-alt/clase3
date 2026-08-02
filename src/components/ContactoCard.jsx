export default function ContactoCard({ id, nombre, telefono, correo, etiqueta, onDelete }) {
  return (
    <article className="tarjeta-contacto">
      <h3>{nombre}</h3>
      <p className="dato">{telefono}</p>
      {correo && <p className="dato">{correo}</p>}
      {etiqueta && <p className="dato">{etiqueta}</p>}
      
      <div className="acciones">
        <button
          type="button"
          className="btn-eliminar"
          onClick={() => onDelete(id)}
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}