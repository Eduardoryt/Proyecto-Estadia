import InformeTecn from "../models/informeTecn.modal.js";
import { v4 as uuidv4 } from 'uuid';

export const verTodasSoli = async (req, res) => {
    try {
        
 
        const solicitudes = await Solicitud.find().populate('proyecto actividades firmas');
                res.json(solicitudes);
            } catch (error) {
                console.error('Error al obtener solicitudes:', error);
                res.
               
        status(500).json({ error: 'Error interno del servidor' });
            }
        };

export const crearUnaSoli = async (req, res) => {
    try {
        const { 
            informe,
            solicitud,
            firmas,
            estado
        } = req.body;

        const nuevaSolicitud = new Solicitud({
            folio: uuidv4(),
            informe,
            solicitud,
            firmas,
            user: req.user.id,
            estado,
            
        });

        await nuevaSolicitud.save();

        res.status(201).json({ mensaje: 'Solicitud agregada correctamente' });
    } catch (error) {
        console.error('Error al agregar solicitud:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const verUnaSoliId = async (req, res) => {
    try {
        const mySoli = await Solicitud.findById(req.params.id);
        if (!mySoli) {
            return res.status(404).json({ mensaje: 'Solicitud no encontrada' });
        }
        res.json(mySoli);
    } catch (error) {
        console.error('Error al obtener solicitud por ID:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const eliminarUnaSoli = async (req, res) => {
    try {
        const mySoli = await Solicitud.findByIdAndDelete(req.params.id);
        if (!mySoli) {
            return res.status(404).json({ mensaje: 'Solicitud no encontrada' });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar solicitud:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const editarUnaSoli = async (req, res) => {
    try {
        const { _id } = req.params; 
        const { 
            informe,
            solicitud,
            firmas,
            estado
        } = req.body;

        const solicitudModificada = await Solicitud.findByIdAndUpdate(_id, {
            informe,
            solicitud,
            firmas,
            estado
        }, { new: true });

        if (!solicitudModificada) {
            return res.status(404).json({ mensaje: 'Solicitud no encontrada' });
        }

        res.json({ mensaje: 'Solicitud modificada correctamente', solicitud: solicitudModificada });
    } catch (error) {
        console.error('Error al modificar solicitud:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
