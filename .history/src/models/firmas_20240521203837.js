const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const firmasSchema = new Schema({
  Estado: String,
  nombre: String,
  Puesto: String,
  
 
});

export default mongoose.model('firmas', firmasSchema);


