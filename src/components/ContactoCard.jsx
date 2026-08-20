function ContactoCard({ contacto, onEliminar }) {
  return (
    <div className="contacto-card">
      <h3>{contacto.nombre}</h3>

      <p>📞 {contacto.telefono}</p>

      <p>📧 {contacto.email}</p>

      <button onClick={() => onEliminar(contacto.id)}>
        Eliminar
      </button>
    </div>
  );
}

export default ContactoCard;
