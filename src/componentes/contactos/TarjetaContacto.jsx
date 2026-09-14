
// TARJETA DE CONTACTO
// Componente de presentación: recibe el
// contacto y avisa cuando piden eliminarlo.

import Boton from "../comunes/Boton";

function TarjetaContacto({
  contacto,
  puedeEliminar = false,
  onEliminar,
}) {
  return (
    <article className="tarjeta-contacto">
      <h3 className="tarjeta-contacto__nombre">
        {contacto.nombre}
      </h3>

      <p className="tarjeta-contacto__dato">
        📞 {contacto.telefono}
      </p>

      <p className="tarjeta-contacto__dato">
        📧 {contacto.email}
      </p>

      {contacto.etiqueta && (
        <span className="tarjeta-contacto__etiqueta">
          {contacto.etiqueta}
        </span>
      )}

      {/* El botón solo existe si el rol lo permite */}
      {puedeEliminar && (
        <Boton
          variante="peligro"
          anchoCompleto
          onClick={() => onEliminar(contacto.id)}
        >
          Eliminar
        </Boton>
      )}
    </article>
  );
}

export default TarjetaContacto;
