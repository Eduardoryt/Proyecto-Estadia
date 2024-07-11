import { Router } from "express";
import { verTodosInformes } from "../controllers/historialInput.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
const router = Router();

router.get("/", verTodosInformes);

export default router;
