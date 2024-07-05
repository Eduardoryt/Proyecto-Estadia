import { Router } from "express";
import {auth} from '../middlewares/auth.middleware.js'
import { crearActividad, obtenerActividades, eliminarActividad,obtenerActividadesPorId} from '../controllers/act.controller.js';

const router = Router();

router.get("/", auth,obtenerActividades);
router.get("/actId/:id", auth,obtenerActividadesPorId);
router.post("/", auth,crearActividad);
router.delete("/:id", eliminarActividad);

export default router;
