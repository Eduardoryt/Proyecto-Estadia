import InformeTecnico from "../models/InformeTec.modal.js";
import Solicitud from "../models/solicitud.modal.js";

export const verTodosInformes = async (req, res) => {
  try {
    const informes = await InformeTecnico.find(
      {},
      {
        "informe.descripcion": 1,
        "informe.Solicita.nombre": 1,
        "informe.Solicita.areaSolicitante": 1,
        "informe.Solicita.edificio": 1,
        "informe.solicitud.diagnostico": 1,
        "informe.solicitud.material.descripcion": 1,
        "informe.solicitud.tecnicos": 1,
        _id: 0,
      }
    );

    // Mapear los resultados para obtener solo los campos necesarios en un solo objeto
    const formattedInformes = informes.map((informe) => {
      // Concatenar los valores de solicitud.insumosSolicitados.descripcion
      const materiales = informe?.informe?.solicitud?.material
        ?.map((item) => item.descripcion)
        .filter(Boolean) // Filtrar valores falsy (undefined, null, etc.)
        .join(", "); // Unir los valores con una coma y un espacio

      return {
        descripcionDelServicio: informe?.informe?.descripcion || "",
        Observacionestecnicas: informe?.informe?.solicitud?.Diagnostico || "",
        materialesDescripcion: materiales || "", // Descripción de materiales
        nombre: informe?.informe?.Solicita?.nombre || "",
        areaSolicitante: informe?.informe?.Solicita?.areaSolicitante || "",
        edificio: informe?.informe?.Solicita?.edificio || "",
        tecnicos: informe?.informe?.solicitud?.tecnicos || "",
      };
    });

    res.json(formattedInformes);
  } catch (error) {
    console.error("Error al obtener informes técnicos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
export const verTodasSoli = async (req, res) => {
  try {
    const solicitudes = await Solicitud.find(
      {},
      {
        areaSolicitante: 1,
        suministros: 1,
        justificacionAdquisicion: 1,
        _id: 0,
      }
    );

    // Mapear los resultados para obtener solo los campos necesarios en un solo objeto
    const formattedSolicitudes = solicitudes.map((soli) => {
      // Obtener solo las descripciones de los suministros
      const descripcionesSuministros = soli.suministros
        .map((item) => item.descripcion)
        .filter(Boolean); // Filtrar valores falsy (undefined, null, etc.)

      return {
        areaSolicitante: soli.areaSolicitante || "",
        suministros: descripcionesSuministros || [], // Devolver array de descripciones
        justificacionAdquisicion: soli.justificacionAdquisicion || "", // Agregar justificación
      };
    });

    res.json(formattedSolicitudes);
  } catch (error) {
    console.error("Error al obtener informes técnicos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
