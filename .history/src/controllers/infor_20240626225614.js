import InformeTecnico from "../models/InformeTecmodal.js";
import { uploadImage } from "../util/cloudinary.js";
import fs from "fs-";

export const verTodosInformes = async (req, res) => {
  try {
    const informes = await InformeTecnico.find();
    res.json(informes);
  } catch (error) {
    console.error("Error al obtener informes técnicos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const crearInforme = async (req, res) => {
  try {
    const {
      areasoli,
      solicita,
      edificio,
      fechaOrden,
      tipoMantenimiento,
      tipoTrabajo,
      tipoSolicitud,
      descripcion,
      user,
    } = req.body;

    const nuevoInforme = new InformeTecnico({
      informe: {
        Solicita: {
          nombre: solicita,
          areaSolicitante: areasoli,
          edificio: edificio,
        },
        fecha: fechaOrden || Date.now(),
        tipoDeMantenimiento: tipoMantenimiento,
        tipoDeTrabajo: tipoTrabajo,
        tipoDeSolicitud: tipoSolicitud,
        descripcionDelServicio: descripcion,
      },
      firmas: "664d5e645db2ce15d4468548",
      user,
      estado: "Pendiente",
    });

    if (req.files?.imagen) {
      const result = await uploadImage(req.files.imagen.tempFilePath); //req.files.imagen.tempFilePath es la direccion del archivo

      //agrega el campo imagen a el objecto
      nuevoInforme.informe.imagen = {
        public_id: result.public_id, //guardamos nombre que ya a tomado el archivo al enviarlo a cloudinary
        secure_url: result.secure_url, //guardamos la url del archivo al enviado a cloudinary
      };

      //fs.unlink es el metodo para eliminar las imagenes guardadas aqui en la pagina
      await fs.unlink(req.files.imagen.tempFilePath);
    }

    await nuevoInforme.save();
    res.status(201).json({ mensaje: "Informe técnico creado correctamente" });
  } catch (error) {
    console.error("Error al crear informe técnico:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const verInformePorId = async (req, res) => {
  try {
    const informe = await InformeTecnico.findById(req.params.id);
    if (!informe) {
      return res.status(404).json({ mensaje: "Informe técnico no encontrado" });
    }
    res.json(informe);
  } catch (error) {
    console.error("Error al obtener informe técnico por ID:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const eliminarInforme = async (req, res) => {
  try {
    const { _id } = req.params;
    const informe = await InformeTecnico.findByIdAndDelete(_id);
    if (!informe) {
      return res.status(404).json({ mensaje: "Informe técnico no encontrado" });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar informe técnico:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const editarInforme = async (req, res) => {
  try {
    const { _id } = req.params;
    const informeModificado = await InformeTecnico.findByIdAndUpdate(
      _id,
      req.body,
      { new: true }
    );
    if (!informeModificado) {
      return res.status(404).json({ mensaje: "Informe técnico no encontrado" });
    }
    res.json({
      mensaje: "Informe técnico modificado correctamente",
      informe: informeModificado,
    });
  } catch (error) {
    console.error("Error al modificar informe técnico:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
