import mongoose from 'mongoose';

const api_keySchema = new mongoose.Schema({
   
    api: String
  });
  
  export default mongoose.model('Firma', firmaSchema);
  