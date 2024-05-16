import { Router } from "express";
import {Auth} from '../middlewares/auth.middleware.js'
import {crearUnaSoli,editarUnaSoli,eliminarUnaSoli,verTodasSoli,verUnaSoliId} from '../controllers/solicitud.controller.js'
const Solirouter = Router();

Solirouter.get("/solicitud", Auth,verTodasSoli);
Solirouter.get("/solicitud/:id", auth,verUnaSoliId);
Solirouter.post("/solicitud", auth,crearUnaSoli);
Solirouter.delete("/solicitud/:id", auth,eliminarUnaSoli);
Solirouter.put("/solicitud/:id", auth,editarUnaSoli);

export default Solirouter;
