import Estados from "../models/estados.modal.js";
import Solicitud from "../models/solicitud.modal.js";

export const verEstados = async (req, res) => {
  try {
    const estados = await Estados.find();
    res.status(200).json(estados);
  } catch (error) {
    console.error("error al crear al consultar los estados");
    res.status(500).json({ message: error.message });
  }
};

export const crearEstados = async (req, res) => {
  try {
    const { id, nombre } = req.body;

    if (id == null || nombre == null) {
      return res
        .status(400)
        .json({ mensaje: "ID y nombre del estado son requeridos" });
    }

    const estadoExistente = await Estados.findOne({ id });
    if (estadoExistente) {
      return res.status(400).json({ mensaje: "ID del estado ya existe" });
    }

    const nuevoEstado = new Estados({ id, nombre });

    await nuevoEstado.save();

    res.status(201).json({
      id: nuevoEstado.id,
      nombre: nuevoEstado.nombre,
      mensaje: "Estado creado exitosamente",
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).json({ mensaje: error.message });
    } else {
      res.status(500).json({ mensaje: error.message });
    }
  }
};

export const actualizarEstados = async (req, res) => {
  try {
    const estadosActualizados = req.body;

    if (
      !Array.isArray(estadosActualizados) ||
      estadosActualizados.length !== 5
    ) {
      return res.status(400).json({
        mensaje: "Se requiere un arreglo de 5 estados para actualizar",
      });
    }

    // Actualizar cada estado basado en su ID
    await Promise.all(
      estadosActualizados.map(({ id, nombre }) =>
        Estados.updateOne({ id }, { nombre })
      )
    );

    res.status(200).json({ mensaje: "Estados actualizados exitosamente" });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

export const filtrarSolicitudesTotalEstados = async (req, res) => {
  try {
    const { mes, anio, idEstado } = req.query;
    let filtro = {};

    const mesNum = mes ? parseInt(mes, 10) : null;
    const anioNum = anio ? parseInt(anio, 10) : null;

    // Filtro de fecha
    if (mesNum !== null) {
      let fechaInicio, fechaFin;

      if (anioNum && !isNaN(anioNum)) {
        fechaInicio = new Date(anioNum, mesNum, 1);
        fechaFin = new Date(anioNum, mesNum + 1, 0);
      } else {
        filtro["$expr"] = {
          $and: [{ $eq: [{ $month: "$informe.fecha" }, mesNum + 1] }],
        };
      }

      if (anioNum && !isNaN(anioNum)) {
        filtro["fecha"] = { $gte: fechaInicio, $lte: fechaFin };
      }
    }

    // Filtro de estado
    if (idEstado) {
      const estadoFiltrado = await Estados.findOne({
        id: idEstado,
      });
      if (estadoFiltrado) {
        filtro["estado"] = estadoFiltrado._id;
      } else {
        return res.status(400).json({ message: "Estado no encontrado" });
      }
    }

    // Obtener informes filtrados
    const solicitud = await Solicitud.find(filtro).populate("estado");

    // Contar informes por estado
    const conteoEstados = {};
    solicitud.forEach((soli) => {
      const estadoId = soli.estado._id.toString();
      conteoEstados[estadoId] = (conteoEstados[estadoId] || 0) + 1;
    });

    // Obtener todos los estados
    const todosLosEstados = await Estados.find();

    // Crear un objeto con todos los estados y su conteo (incluyendo los que no tienen informes)
    const conteoPorEstado = todosLosEstados.map((estado) => ({
      id: estado.id,
      nombre: estado.nombre,
      cantidadTotal: conteoEstados[estado._id.toString()] || 0,
    }));

    res.status(200).json(conteoPorEstado);
  } catch (error) {
    console.error("Error al filtrar informes:", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};
