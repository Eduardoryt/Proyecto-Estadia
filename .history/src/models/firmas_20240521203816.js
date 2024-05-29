const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const firmasSchema = new Schema({
  Estado: String,
  nombre: String,
  Puesto: String,
  enum: ['Administración y Finanzas Mantenimiento y Servicios Generales',
  'Otro Departamento'  ], 
 
});

export default mongoose.model('firmas', firmasSchema);


