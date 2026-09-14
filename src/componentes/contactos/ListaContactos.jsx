// LISTA DE CONTACTOS
// Solo pinta la rejilla o el mensaje de
// "sin resultados". No pide datos.

import TarjetaContacto from "./TarjetaContacto";

function ListaContactos({
  contactos,
  puedeEliminar = false,
  onEliminar,
  mensajeVacio = "No se encontraron contactos que coincidan con la búsqueda.",
}) {
  if (contactos.length === 0) {
    return (
      <p className="sin-resultados">{mensajeVacio}</p>
    );
  }

  return (
    <div className="lista-contactos">
      {contactos.map((contacto) => (
        <TarjetaContacto
          key={contacto.id}
          contacto={contacto}
          puedeEliminar={puedeEliminar}
          onEliminar={onEliminar}
        />
      ))}
    </div>
  );
}

export default ListaContactos;
