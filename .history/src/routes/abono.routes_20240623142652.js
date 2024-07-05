import { Router } from "express";
import { crearInforme,editarInforme,eliminarInforme,verInformePorId,verTodosInformes } from '../controllers/infor.js';

const router = Router();

router.put("/:id", editarInforme);
router.get("/:id", verInformePorId);
router.delete("/:id", eliminarInforme);

export default router;
