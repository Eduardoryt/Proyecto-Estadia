import mongoose from 'mongoose';

const solicitudSchema = new mongoose.Schema({
  folio:String,
  areaSolicitante: {
    type: String,
    required: true,
    enum: ['Administración y Finanzas Mantenimiento y Servicios Generales',
    'Otro Departamento'  ],             // Agrega más áreas según sea necesario],/*Agrega que mas puede recibir*/ 
    default: 'Administración y Finanzas Mantenimiento y Servicios Generales'},
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
      type: mongoose.Types.ObjectId,
      ref: "Firmas",
    },user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    estado: {
      type: String,
      required: true,
      enum: ['Pendiente', 'Asignada', 'Diagnosticada','Atendida','Rechaza'],
      default: 'Pendiente'
    }
});

export default mongoose.model('Solicitud', solicitudSchema);