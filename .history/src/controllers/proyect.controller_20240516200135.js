import Proyecto from '../models/proyecto.modal.js';

export const crearProyecto = async (req, res) => {
    try {
        const { nombre } = req.body;
        const nuevoProyecto = new Proyecto({ nombre });
        await nuevoProyecto.save();
        res.status(201).json({ mensaje: 'Proyecto creado correctamente' });
    } catch (error) {
        console.error('Error al crear proyecto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const obtenerProyectos = async (req, res) => {
    try {
        const proyectos = await Proyecto.find();
        res.json(proyectos);
    } catch (error) {
        console.error('Error al obtener proyectos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


import Proyecto from '../models/Proyecto'; // Asegúrate de importar el modelo Proyecto

export const obtenerIdsYNombreProyectos = async (req, res) => {
  try {
    // Realizar la consulta para obtener los IDs y nombres de todos los proyectos
    const proyectos = await Proyecto.find({}, '_id nombre');

    // Enviar la respuesta con los IDs y nombres de los proyectos
    res.json(proyectos);
  } catch (error) {
    console.error("Error al obtener IDs y nombres de proyectos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};


export const eliminarProyecto = async (req, res) => {
    try {
        const proyectoEliminado = await Proyecto.findByIdAndDelete(req.params.id);
        if (!proyectoEliminado) {
            return res.status(404).json({ mensaje: 'Proyecto no encontrado' });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar proyecto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
