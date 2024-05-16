import { Router } from "express";
import {auth} from '../middlewares/auth.middleware.js'
import {crearUnaSoli,editarUnaSoli,eliminarUnaSoli,verTodasSoli,verUnaSoliId} from '../controllers/solicitud.controller.js'
const Solirouter = Router();

Solirouter.get("/solicitud", auth,verTodasSoli);
Solirouter.get("/solicitud/:folio", auth,verUnaSoliId);
Solirouter.post("/solicitud", auth,crearUnaSoli);
Solirouter.delete("/solicitud/:dolio", auth,eliminarUnaSoli);
Solirouter.put("/solicitud/:id", auth,editarUnaSoli);

export default Solirouter;
