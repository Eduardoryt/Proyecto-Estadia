import { Router } from "express";
import {auth} from '../middlewares/auth.middleware.js'
import {crearUnaSolicitud,editarUnaSolicitud,eliminarUnaSolicitud,getTodasSolicitudes,verUnaSolicitudPorId} from '../controllers/solicitud.controller.js'
const router = Router();


router.get("/solicitud",auth,getTodasSolicitudes);
router.get("/solicitud/:id",auth,verUnaSolicitudPorId);
router.post("/solicitud",auth,crearUnaSolicitud);
router.delete("/solicitud/:id",eliminarUnaSolicitud);
router.put("/solicitud/:id",editarUnaSolicitud);

export default router;
