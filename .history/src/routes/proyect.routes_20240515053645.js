import { Router } from "express";
import { crearInforme,editarInforme,eliminarInforme,verInformePorId,verTodosInformes } from '../controllers/infor.js';

const router = Router();

router.get("/proyecto", obtenerProyectos);
router.post("/proyecto", crearInforme);
router.editarInforme("/proyecto/:id", eliminarProyecto);
router.delete("/proyecto/:id", eliminarProyecto);

export default router;
