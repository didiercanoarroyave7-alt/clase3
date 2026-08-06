export default function ContactoCard({
  id,
  nombre,
  telefono,
  correo,
  etiqueta,
  onDelete,
}) {
  return (
    <article className="flex items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="space-y-1">
        <h3 className="font-bold text-gray-800">{nombre}</h3>

        <p className="text-sm text-gray-600">📞 {telefono}</p>

        {correo && <p className="text-sm text-gray-600">✉️ {correo}</p>}

        {etiqueta && <p className="text-sm text-gray-600">🏷️ {etiqueta}</p>}
      </div>

      <button
        type="button"
        onClick={() => onDelete(id)}
        className="rounded-full bg-red-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-red-600"
      >
        Eliminar
      </button>
    </article>
  );
}
