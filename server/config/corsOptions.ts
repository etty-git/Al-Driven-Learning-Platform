import { CorsOptions } from "cors";

const allowedOrigins: string[] = [
  "http://localhost:3000",
  "http://localhost:5000",
  "http://localhost:3001"
];

const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback) => {
    // לאפשר בקשות בלי origin (כמו Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

export default corsOptions;