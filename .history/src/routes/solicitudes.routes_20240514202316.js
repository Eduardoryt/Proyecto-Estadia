import { Router } from "express";
import {crearSoli,editarSoli} from '../controllers/solicitud.controller.js'
const Solirouter = Router();

Solirouter.get("/solicitud", auth);

Solirouter.get("/solicitud/:id", auth);
Solirouter.post("/solicitud", auth);
Solirouter.put("/solicitud", auth);

export default Solirouter;
