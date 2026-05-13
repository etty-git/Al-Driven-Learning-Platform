import dotenv from "dotenv";
import mongoose from "mongoose";
import Categories from "../models/Categories";
import Sub_Category from "../models/Sub_categories";

dotenv.config();

const seedSubCategories = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI is required");
  }

  await mongoose.connect(mongoUri);

 const data = {
  Grammar: ["Tenses", "Syntax", "Vocabulary", "Writing"],
  Mathematics: ["Algebra", "Geometry", "Calculus", "Statistics"],
  Psychology: ["Cognitive", "Behavioral", "Social", "Developmental"],
  English: ["Reading", "Writing", "Speaking", "Listening"],
  ComputerScience: ["Algorithms", "Data Structures", "Databases", "Networking"],
  ArtificialIntelligence: ["Machine Learning", "Neural Networks", "NLP", "Computer Vision"],
  Physics: ["Mechanics", "Electricity", "Optics", "Thermodynamics"],
  Chemistry: ["Organic", "Inorganic", "Analytical", "Physical"],
  Biology: ["Genetics", "Ecology", "Anatomy", "Evolution"],
  History: ["Ancient", "Medieval", "Modern", "World Wars"],
  Geography: ["Maps", "Climate", "Countries", "Population"],
  Philosophy: ["Logic", "Ethics", "Metaphysics", "Epistemology"],
};

  for (const categoryName in data) {
    const category = await Categories.findOne({ name: categoryName });

    if (!category) {
      console.log(`Category not found: ${categoryName}`);
      continue;
    }

    for (const subName of data[categoryName as keyof typeof data]) {
      await Sub_Category.updateOne(
  { name: subName, category: category._id },
  { $set: { name: subName, category: category._id } },
  { upsert: true }
);
    }
  }

  console.log("✅ 40 SubCategories seeded successfully");

  
};

seedSubCategories().catch(async (error) => {
  console.error("❌ SubCategory seed failed:", error);
  
  process.exit(1);
});
export { seedSubCategories };