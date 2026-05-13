import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../models/Users";

dotenv.config();

// יצירת/עדכון משתמש אדמין אוטומטי לפי ENV
const seedAdmins = async () => {
  const mongoUri = process.env.MONGO_URI;
  const name = process.env.ADMIN_NAME || "Admin";
  const phone = process.env.ADMIN_PHONE || "0500000000";

  if (!mongoUri) {
    throw new Error("MONGO_URI is required");
  }

  await mongoose.connect(mongoUri);

  const admin = await User.findOneAndUpdate(
    { phone },
    { name, phone, isAdmin: true },
    { returnDocument: "after", upsert: true }
  );

  console.log(`Admin ready: ${admin.name} (${admin.phone})`);

  await mongoose.disconnect();
};

// הרצת seed + טיפול בשגיאות
seedAdmins().catch(async (error) => {
  console.error("Admin seed failed:", error);
  await mongoose.disconnect();
  process.exit(1);
});