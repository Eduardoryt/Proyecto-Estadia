import { Router } from "express";
import {auth} from '../middlewares/auth.middleware.js'
import {crearUnaSoli,editarUnaSoli,eliminarUnaSoli,verTodasSoli,verUnaSoliId} from '../controllers/solicitud.controller.js'
const router = Router();

router.get("/solicitud",verTodasSoli);
router.get("/solicitud/:id" ,verUnaSoliId);
router.post("/solicitud",crearUnaSoli);
router.delete("/solicitud/:id", auth,eliminarUnaSoli);
router.put("/solicitud/:id", auth,editarUnaSoli);

export default router;
