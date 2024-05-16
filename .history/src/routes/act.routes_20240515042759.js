import { Router } from "express";
import { crearActividad, obtenerActividades, eliminarActividad } from '../controllers/.js';

const router = Router();

router.get("/actividad", obtenerActividades);
router.post("/actividad", crearActividad);
router.delete("/actividad/:id", eliminarActividad);

export default router;
