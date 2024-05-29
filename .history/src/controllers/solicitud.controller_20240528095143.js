import Solicitud from "../models/solicitud.modal.js";

export const getTodasSolicitudes = async (req, res) => {
  try {
    const solicitudes = await Solicitud.find();
    res.json(solicitudes);
  } catch (error) {
    console.error("Error al obtener solicitudes:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const crearUnaSolicitud = async (req, res) => {
  try {
    const {
      folio,
      suministro,
      pc,
      proyecto,
      actividad,
      estado,
      fecha,
      justificacion,
      id,
      items  
    } = req.body;

    const nuevaSolicitud = new Solicitud({
      folio,
      tipoSuministro:suministro,
      procesoClave:pc,
      proyecto,
      actividades: actividad,
      estado,
      fecha,
      firmas:"664d5e645db2ce15d4468548",
      justificacionAdquisicion: justificacion,
      user:id,
      suministros: items  
    });

    await nuevaSolicitud.save();

    res.status(201).json({ mensaje: "Solicitud agregada correctamente" });
  } catch (error) {
    console.error("Error al agregar solicitud:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const verUnaSolicitudPorId = async (req, res) => {
  try {
    const id = req.params.id
    
    const solicitud = await Solicitud.findById(id)
    if (!solicitud) {
      return res.status(404).json({ mensaje: "Solicitud no encontrada" });
    }

    res.json(solicitud);
    console.log("busqueda exitosa")
  } catch (error) {
    console.error("Error al obtener solicitud por ID:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const eliminarUnaSolicitud = async (req, res) => {
  try {
    const solicitud = await Solicitud.findByIdAndDelete(req.params.id);
    if (!solicitud) {
      return res.status(404).json({ mensaje: "Solicitud no encontrada" });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar solicitud:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const editarUnaSolicitud = async (req, res) => {
  try {
    const { _id } = req.params;
    const {
      areaSolicitante,
      fecha,
      tipoSuministro,
      
      area,pc,
      suministros,
      proyecto,
      actividades,
      justificacion,
      firmas,

      estado,
    } = req.body;

    const solicitudModificada = await Solicitud.findByIdAndUpdate(
      _id,
      {
        areaSolicitante,
        fecha,
        tipoSuministro,
        procesoClave:pc,
        area,
        suministros,
        proyecto,
        actividades,
        justificacionAdquisicion:justificacion,
        firmas,

        estado,
      },
      { new: true }
    )
      .populate("user")
      .populate("suministros actividades");

    if (!solicitudModificada) {
      return res.status(404).json({ mensaje: "Solicitud no encontrada" });
    }

    res.json({
      mensaje: "Solicitud modificada correctamente",
      solicitud: solicitudModificada,
    });
  } catch (error) {
    console.error("Error al modificar solicitud:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const verSolicitudesPorEstado = async (req, res) => {
  try {
    const { estado } = req.params;
    const estadosValidos = ['Pendiente', 'Asignada', 'Diagnosticada', 'Atendida', 'Rechazada'];
    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({ mensaje: `Estado inválido. Debe ser uno de los siguientes: ${estadosValidos.join(', ')}` });
    }

    const solicitudes = await Solicitud.find({ estado });
   
    if (solicitudes.length === 0) {
      return res.status(404).json({ mensaje: "No se encontraron solicitudes para el estado proporcionado" });
    }
    
    res.json(solicitudes);
    console.log("Búsqueda exitosa");
  } catch (error) {
    console.error("Error al obtener solicitudes por estado:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};