import mongoose from 'mongoose';

const solicitudSchema = new mongoose.Schema({
  folio:String,
  areaSolicitante:String,
  fecha: Date, 
  tipoSuministro: String,
  procesoClave: String,
  suministros: [{
    cantidad: Number,
    unidadMedida: String,
    descripcion: String,
    cantidadEntregada: Number
  }],
    proyecto: String,
    actividades:String,
    justificacionAdquisicion: String,
    firmas: {
    solicitud: String,
    revision: String,
    validacion: String,
    autorizacion: String
    },user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    estado: {
      type: String,
      required: true,
      enum: ['Pendiente', 'Approved', 'Rejected'],
      default: 'Pendiente'
    }
});

export default mongoose.model('Solicitud', solicitudSchema);