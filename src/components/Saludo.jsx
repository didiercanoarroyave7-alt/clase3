function Saludo({ nombre = "Aprendiz", curso = "React" }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
      <h2 className="text-2xl font-bold text-purple-700">Hola {nombre}!</h2>
      <p className="mt-2 text-gray-600">Bienvenido al curso de {curso}</p>
    </div>
  );
}

export default Saludo;