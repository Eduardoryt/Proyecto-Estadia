import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import {
  crearInforme,
  editarInforme,
  eliminarInforme,
  verInformePorId,
  verTodosInformes,
} from "../controllers/infor.controller.js";
import fileUpload from "express-fileupload";

const router = Router();

router.get("/", auth, verTodosInformes);
router.get("/", auth, LlenadoDEPInforme);
router.post("/",auth,fileUpload({useTempFiles: true, //para guardar archivos de manera temporal
    tempFileDir: "./uploads",//ruta de donde se va a guardar
  }),
  crearInforme
);
router.put("/:id", auth, editarInforme);
router.get("/:id", auth, verInformePorId);
router.delete("/:id",auth, eliminarInforme);

export default router;
