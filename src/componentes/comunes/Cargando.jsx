// ESTA ES PARA CUANDO ESTE CARGANDO LA PAGINA, PARA QUE 
// EL USUARIO SEPA QUE 
// SE ESTA CARGANDO ALGO TAMBIEN CUANDO LE DA 
// ENVIAR A UN FORMULARIO Y SE ESTA PROCESANDO LA INFORMACION 
// CARGANDO
// 

function Cargando({ texto = "Cargando...", pantallaCompleta = false }) {
  return (
    <div
      className={
        pantallaCompleta
          ? "cargando cargando--pantalla"
          : "cargando"
      }
      role="status"
      aria-live="polite"
    >
      <span className="cargando__rueda" aria-hidden="true" />
      <p className="cargando__texto">{texto}</p>
    </div>
  );
}

export default Cargando;
