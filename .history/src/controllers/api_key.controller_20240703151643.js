import Api_key from "../models/Api_key.modal.js";

export const obtenerApi_key = async (req, res) => {
    try {
      const api_key = await Api_key.find();
      res.json(api_keypi_key);
    } catch (error) {
      console.error("Error al obtener la:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  };
  