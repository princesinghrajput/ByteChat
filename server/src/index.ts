import express, { Application, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
const app: Application = express();
const PORT = process.env.PORT || 7000;
import Routes from "./routes/index.js";


// * Middleware
// Log all incoming requests for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mount routes at /api
app.use("/api", Routes);

// Add error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

app.get("/", (req: Request, res: Response) => {
  return res.send("It's working 🙌");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
