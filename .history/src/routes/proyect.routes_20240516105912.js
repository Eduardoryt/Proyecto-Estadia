import { Router } from "express";
import { crearInforme,editarInforme,eliminarInforme,verInformePorId,verTodosInformes } from '../controllers/proyect.controller.js';

const router = Router();

router.get("/proyecto", verTodosInformes);
router.post("/proyecto", crearInforme);
router.put("/proyecto/:id", eliminarProyecto);
router.get("/proyecto/:id", verInformePorId);
router.delete("/proyecto/:id", eliminarInforme);

export default router;
