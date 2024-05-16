import { Router } from "express";
// import {auth} from '../middlewares/auth.middleware.js'
import {crearUnaSoli,editarUnaSoli,eliminarUnaSoli,verTodasSoli,verUnaSoliId} from '../controllers/solicitud.controller.js'
const router = Router();

router.get("/informe",verTodasSoli);
router.get("/informe/:id",verUnaSoliId);
router.post("/informe",crearUnaSoli);
router.delete("/informe/:id",eliminarUnaSoli);
router.put("/informe/:id",editarUnaSoli);

export default router;
