import { z } from "zod";

export const registerTecnicoSchema = z.object({
  fechaOrden: z.string().nonempty({ message: "La fecha es requerida" }),
  areasoli: z
    .string()
    .nonempty({ message: "El área solicitante es requerida" }),
  atendio: z
    .string()
    .nonempty({ message: "El nombre del que atendió es requerido" }),
  solicita: z
    .string()
    .nonempty({ message: "El nombre de quien solicita es requerido" }),
  edificio: z
    .string()
    .nonempty({ message: "El nombre del que edificio es requerido" }),
  tipoMantenimiento: z
    .string()
    .nonempty({ message: "El nombre del que tipo mantenimiento es requerido" }),
  tipoTrabajo: z
    .string()
    .nonempty({ message: "El nombre del que tipo de trabajo es requerido" }),
  tipoSolicitud: z
    .string()
    .nonempty({ message: "El nombre del que tipo de solicitud es requerido" }),
  descripcion: z.string().nonempty({ message: "La descripcion es requerida" }),

  proyecto: z.string().nonempty({ message: "El proyecto es requerido" }),
  fechaAtencion: z
    .()
    .nonempty({ message: "La fecha de atención es requerida" }),
  descripcion: z.string().nonempty({ message: "La descripción es requerida" }),
  insumos: z.array(
    z.object({
      cantidad: z.string().nonempty({ message: "La cantidad es requerida" }),
      descripcion: z
        .string()
        .nonempty({ message: "La descripción es requerida" }),
    })
  ),
  observaciones: z
    .string()
    .nonempty({ message: "Las observaciones son requerida" }),
});
