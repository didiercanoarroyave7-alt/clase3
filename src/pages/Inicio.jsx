import FormularioContacto from "../components/FormularioContacto";
import { Link } from "react-router-dom";

export default function Inicio({ onAgregar }) {
  return (
    <main className="app-container">

      {/* Encabezado */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <div>
          <h1 className="app-title" style={{ margin: 0 }}>
            📒 Agenda
          </h1>

          
        </div>
<p
            style={{
              color: "#555",
              marginTop: "5px",
              fontSize: "18px",
              textAlign:"center"
            }}
          >
            Hola, bienvenido a tu agenda de contactos
          </p>
        <Link to="/contactos">
          <button className="btn-nav">
            📋 Ver contactos
          </button>
        </Link>
      </div>

      {/* Formulario */}
      <FormularioContacto onAgregar={onAgregar} />

    </main>
  );
}