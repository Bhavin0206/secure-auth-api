import express, { Application, Request, Response } from "express";
import authRoutes from "./routes/auth.routes";
import errorHandler from "./middleware/error.middleware";

const app: Application = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Secure Auth API is running",
  });
});

app.use("/api/auth", authRoutes);

// keep this LAST
app.use(errorHandler);

export default app;