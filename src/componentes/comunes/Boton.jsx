// ==========================================
// BOTÓN
// ==========================================
// Componente de presentación. No sabe nada de
// negocio: solo pinta y avisa del clic.

function Boton({
  children,
  tipo = "button",
  variante = "primario",
  cargando = false,
  textoCargando = "Procesando...",
  deshabilitado = false,
  anchoCompleto = false,
  onClick,
  ...resto
}) {
  const clases = [
    "boton",
    `boton--${variante}`,
    anchoCompleto ? "boton--ancho" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={tipo}
      className={clases}
      // Mientras carga, el botón se bloquea para
      // que no se envíe el formulario dos veces.
      disabled={deshabilitado || cargando}
      onClick={onClick}
      {...resto}
    >
      {cargando ? textoCargando : children}
    </button>
  );
}

export default Boton;
