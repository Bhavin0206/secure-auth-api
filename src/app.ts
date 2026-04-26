import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import adminRoutes from "./routes/admin.routes";
import errorHandler from "./middleware/error.middleware";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

const app: Application = express();
app.use(helmet());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    // methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    // allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());


app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Secure Auth API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

if (process.env.NODE_ENV !== "production") {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}


// keep this LAST
app.use(errorHandler);

export default app;

// rate limiting
// Helmet
// strict CORS
// login attempt protection
// audit logs
// tests