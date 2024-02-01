import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
config();
const app = express();

//middlewares
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

//remove it in production
app.use(morgan("dev"));

const __dirname = path.resolve();
if (process.env.NODE_ENV === "prod") {
  app.use(express.static(path.resolve(__dirname, "../", "frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "dist", "index.html")
    );
  });
} else {
  app.get("/", (req, res) => res.send("<h1>Welcome to the Dev.</h1>"));
}

app.get("/api", (req, res) =>
  res.json({
    message: "JAI SHREE RAM 🚩",
  })
);

app.use("/api/v1", appRouter);

export default app;
