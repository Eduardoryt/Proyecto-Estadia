import { Router } from "express";
import { crearFirma,editarFirma,eliminarFirma,obtenerFirmaPorId,} from '../controllers/firmas.controller.js';

const router = Router();

router.get("/", obtenerActividades);
router.get("/actId/:id", obtenerActividadesPorId);
router.post("/", crearActividad);
router.delete("/:id", eliminarActividad);

export default router;
