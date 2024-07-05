import express from "express";
import {
  obtenerUltimoFolioCounterSoli,
  obtenerUltimoFolioCounterInforme,
} from "../controllers/folio.controller.js";
import {auth} from '../middlewares/auth.middleware.js'

const router = express.Router();

router.get("/ultimo-folio-counter", auth,obtenerUltimoFolioCounterSoli);
router.get("/ultimo-folio-counter-informe", auth,obtenerUltimoFolioCounterInforme);

export default router;
