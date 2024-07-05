import Solicitud from "../models/solicitud.modal.js";

export const abonarSolicitud = async (req, res) => {
  try {
    const { id } = req.params;
    const { folioExterno, items } = req.body;

    console.log(items);

    const solicitudExistente = await Solicitud.findById(id);
    if (!solicitudExistente) {
      return res.status(404).json({ mensaje: "Solicitud no encontrada" });
    }

    const existeFolioExterno = await Solicitud.exists({ folioExterno });

    if (!existeFolioExterno) {
      solicitudExistente.folioExterno = folioExterno;
    }

    items.forEach((item) => {
      const suministro = solicitudExistente.suministros.find(
        (s) => s._id.toString() === item._id
      );

      if (suministro) {
        const cantidadEntregada = Number(item.cantidadEntregada);
        if (isNaN(cantidadEntregada)) {
          throw new Error(
            `La cantidad entregada para el suministro ${item._id} no es un número válido.`
          );
        }

        // Calcular la nueva cantidad acumulada
        const nuevaCantidadAcumulada =
          suministro.cantidadAcumulada + cantidadEntregada;

        // Verificar si la nueva cantidad acumulada excede la cantidad permitida
        if (nuevaCantidadAcumulada > suministro.cantidad) {
          throw new Error(
            `La cantidad acumulada para el suministro ${item._id} excede la cantidad permitida.`
          );
        }

        // Actualizar los campos del suministro
        suministro.cantidadAcumulada = nuevaCantidadAcumulada;
        suministro.cantidadEntregada = 0;
        suministro.NumeroDeEntregas += 1;
      }
    });

    await solicitudExistente.save();

    res.json(solicitudExistente);
    console.log("Solicitud actualizada exitosamente");
  } catch (error) {
    console.error("Error al actualizar la solicitud:", error);
    res.status(500).json({ error: error.message });
  }
};