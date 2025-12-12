import mongoose, { Schema } from "mongoose";

const newsSchema = new Schema({
  header: String,
  source: String,
  date: Date,
  securities: [String], // Array of related stock symbols
  content: String,      // Full text for the Details page
  imageUrl: String,
});

export const News = mongoose.models.News || mongoose.model("News", newsSchema);