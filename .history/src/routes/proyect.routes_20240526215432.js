import { Router } from "express";
import { crearProyecto,obtenerIdsYNombreProyectos,eliminarProyecto,obtenerProyectos,obtenerProyectoYActividades,trae_Proyect_Act_Nombre } from '../controllers/proyect.controller.js';

const router = Router();

router.get("/", obtenerProyectos);
router.get("//ids", obtenerIdsYNombreProyectos);
router.get('/proyecto/:id', obtenerProyectoYActividades);
router.get('/proyecto/:nombre', trae_Proyect_Act_Nombre);
router.post("/proyecto", crearProyecto);
router.delete("/proyecto/:id", eliminarProyecto);

export default router;
