import dotenv from "dotenv";
import mongoose from "mongoose";
import Categories from "../models/Categories";
import e from "express";

dotenv.config();

const seedCategories = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI is required");
  }

  await mongoose.connect(mongoUri);

  const categories = [
  "Grammar",
  "Mathematics",
  "Psychology",
  "English",
  "Computer Science",
  "Artificial Intelligence",
  "Physics",
  "Chemistry",
  "Biology",
  "History",
  "Geography",
  "Philosophy",
];

  for (const name of categories) {
    await Categories.updateOne(
  { name },
  { $set: { name } },
  { upsert: true }
);
  }

  console.log("✅ 10 Categories seeded successfully");


};

seedCategories().catch(async (error) => {
  console.error("❌ Category seed failed:", error);
  
  process.exit(1);
});
export { seedCategories };