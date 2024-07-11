import mongoose from "mongoose";

const api_keySchema = new mongoose.Schema({
  api_key: { type: String, required: true ,},
});

export default mongoose.model("Api_key", api_keySchema);
