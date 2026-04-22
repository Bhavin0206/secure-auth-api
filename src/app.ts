import express, { Application, Request, Response } from "express";

const app: Application = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Secure Auth API is running",
  });
});

export default app;