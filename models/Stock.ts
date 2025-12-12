import mongoose, { Schema } from "mongoose";

const stockSchema = new Schema({
  symbol: { type: String, required: true }, // e.g., AAPL
  name: String,
  price: Number,
  changePercent: Number,
  volume: Number,
  category: String,
  recommendDays: Number, // For Analysis page
  isSeasonal: { type: Boolean, default: false }, // For Home page grid
  isWatchlist: { type: Boolean, default: false }, // For Watchlist page
});

export const Stock = mongoose.models.Stock || mongoose.model("Stock", stockSchema);