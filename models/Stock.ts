import { percent } from "framer-motion";
import mongoose, { Schema } from "mongoose";

const stockSchema = new Schema({
  symbol: { type: String, required: true },
  name: String,
  price: Number,
  changePercent: Number,
  volume: Number,
  category: String,
  percentLoss: Number, // ยังไม่รู้คำนวณจากอะไร
  recommendDays: Number,
  isSeasonal: { type: Boolean, default: false },
  isWatchlist: { type: Boolean, default: false },
});

export const Stock = mongoose.models.Stock || mongoose.model("Stock", stockSchema);