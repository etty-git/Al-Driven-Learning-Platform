import { CorsOptions } from "cors";

/**
 * רשימת כתובות שמורשות לגשת לשרת (CORS)
 */
const allowedOrigins: string[] = [
  "http://localhost:3000",
  "http://localhost:5000",
  "http://localhost:3001",
];

/**
 * הגדרות CORS לשרת
 */
const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;