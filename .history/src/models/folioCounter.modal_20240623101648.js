import mongoose from 'mongoose';

const folioCounterSchema = new mongoose.Schema({
  counter: {
    type: Number,
    default: 0
  },
  month: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  }
  counterInforme
});

export default mongoose.model('FolioCounter', folioCounterSchema);
