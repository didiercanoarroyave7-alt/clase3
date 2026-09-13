// ==========================================
// HOOK: usarContactos
// ==========================================
// Trae los contactos de la API y encapsula
// búsqueda, orden y paginación.
//
// Lo usan la página de Búsqueda y el panel de
// Administrador sin repetir la lógica.

import { useCallback, useEffect, useMemo, useState } from "react";

import { servicioContactos } from "../servicios/api";

export function usarContactos({ porPagina = 4 } = {}) {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // La búsqueda arranca vacía cada vez que se
  // monta el hook, así cambiar de sección deja
  // el listado en un estado predecible.
  const [busqueda, setBusqueda] = useState("");
  const [ordenAsc, setOrdenAsc] = useState(true);
  const [paginaActual, setPaginaActual] = useState(1);
  const [contactosPorPagina, setContactosPorPagina] =
    useState(porPagina);

  // ==========================================
  // CARGAR
  // ==========================================

  const cargar = useCallback(async () => {
    setCargando(true);
    setError("");

    try {
      const datos = await servicioContactos.listar();
      setContactos(datos);
    } catch {
      setError(
        "No se pudo conectar con la API. Ejecuta: npx json-server db.json --port 3001"
      );
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  // ==========================================
  // AGREGAR
  // ==========================================

  const agregar = useCallback(async (contacto) => {
    const nuevo = await servicioContactos.crear(contacto);
    setContactos((previos) => [...previos, nuevo]);
    setPaginaActual(1);
    return nuevo;
  }, []);

  // ==========================================
  // ELIMINAR
  // ==========================================

  const eliminar = useCallback(async (id) => {
    await servicioContactos.eliminar(id);

    setContactos((previos) =>
      previos.filter((contacto) => contacto.id !== id)
    );
  }, []);

  // ==========================================
  // ¿EL CORREO YA ESTÁ EN LA AGENDA?
  // ==========================================

  const correoRepetido = useCallback(
    (correo = "") => {
      const buscado = correo.trim().toLowerCase();

      return contactos.some(
        (contacto) =>
          (contacto.email || "").trim().toLowerCase() === buscado
      );
    },
    [contactos]
  );

  // ==========================================
  // FILTRAR (sin distinguir mayúsculas)
  // ==========================================

  const filtrados = useMemo(() => {
    const termino = busqueda.toLowerCase().trim();

    if (!termino) {
      return contactos;
    }

    return contactos.filter((contacto) => {
      const campos = [
        contacto.nombre,
        contacto.email,
        contacto.telefono,
        contacto.etiqueta,
      ];

      return campos.some((campo) =>
        (campo || "").toLowerCase().includes(termino)
      );
    });
  }, [contactos, busqueda]);

  // ==========================================
  // ORDENAR
  // ==========================================

  const ordenados = useMemo(() => {
    return [...filtrados].sort((a, b) => {
      const nombreA = (a.nombre || "").toLowerCase();
      const nombreB = (b.nombre || "").toLowerCase();

      const comparacion = nombreA.localeCompare(nombreB, "es");

      return ordenAsc ? comparacion : -comparacion;
    });
  }, [filtrados, ordenAsc]);

  // ==========================================
  // PAGINACIÓN
  // ==========================================

  const totalPaginas = Math.ceil(
    ordenados.length / contactosPorPagina
  );

  // Al cambiar búsqueda, orden o tamaño de
  // página volvemos al inicio del listado.
  useEffect(() => {
    setPaginaActual(1);
  }, [busqueda, ordenAsc, contactosPorPagina]);

  // Si se eliminan contactos y la página actual
  // deja de existir, retrocedemos.
  useEffect(() => {
    if (totalPaginas === 0) {
      setPaginaActual(1);
      return;
    }

    setPaginaActual((previa) =>
      previa > totalPaginas ? totalPaginas : previa
    );
  }, [totalPaginas]);

  const indiceInicio =
    (paginaActual - 1) * contactosPorPagina;

  const paginados = ordenados.slice(
    indiceInicio,
    indiceInicio + contactosPorPagina
  );

  const cambiarPagina = useCallback(
    (numero) => {
      if (numero >= 1 && numero <= totalPaginas) {
        setPaginaActual(numero);
      }
    },
    [totalPaginas]
  );

  return {
    // datos
    contactos,
    paginados,
    totalFiltrados: ordenados.length,
    cargando,
    error,

    // búsqueda y orden
    busqueda,
    setBusqueda,
    ordenAsc,
    setOrdenAsc,

    // paginación
    paginaActual,
    totalPaginas,
    contactosPorPagina,
    setContactosPorPagina,
    cambiarPagina,

    // acciones
    cargar,
    agregar,
    eliminar,
    correoRepetido,
  };
}

export default usarContactos;
