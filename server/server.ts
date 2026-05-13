import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/connectDB";
import corsOptions from "./config/corsOptions";

import Categories from "./models/Categories";
import {seedCategories} from "./seed/categories";
import { seedSubCategories } from "./seed/sub_categories";

dotenv.config();

const app = express();

const Port = process.env.PORT || 7001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/prompts", require("./routes/prompts"));
app.use("/api/sub_categories", require("./routes/sub_categories"));

// MongoDB connected
mongoose.connection.once("open", async () => {
  console.log("Connected to MongoDB");

  // 👇 ADDED SEED LOGIC HERE
  const count = await Categories.countDocuments();

  if (count === 0) {
    await seedCategories();
    await seedSubCategories();
  }

  app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
  });
});

// MongoDB error
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});