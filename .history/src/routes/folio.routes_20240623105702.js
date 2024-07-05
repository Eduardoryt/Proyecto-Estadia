import express from 'express';
import { ,obtenerUltimoFolioCounterInforme } from '../controllers/folio.controller.js';

const router = express.Router();

router.get('/ultimo-folio-counter', obtenerUltimoFolioCounterSoli);
router.get('/ultimo-folio-counter-informe', obtenerUltimoFolioCounterInforme);

export default router;
