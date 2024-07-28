import express, { Express, Request, Response, NextFunction } from "express";
// import cookieParser from "cookie-parser";
import cors from "cors";
import nodemon from "nodemon";
import DataBaseController from "./controllers/DataBaseController.js";
// import errorHandler from "./middleware/ErrorHandler.js";
import routes from "./routes/index.js";
import { User } from "./models/UserModel.js";
import dotenv from "dotenv";
dotenv.config();

const app: Express = express();
const HOST = process.env.SERVER_HOST || "localhost";
const PORT = process.env.SERVER_PORT || 5000;

const DBController = new DataBaseController([User]);

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

app.use("/api", routes);
// app.use(errorHandler);
app.use("/", (req: Request, res: Response, next: NextFunction) => {
  return res.json({ message: "Good job!" });
});

const start = async () => {
  try {
    await DBController.connectDB();
    app.listen(PORT, () => console.log(`http://${HOST}:${PORT}`));
  } catch (e) {
    console.log(e);
    await DBController.disconnectDB();
  }
};

async function gracefulShutdown() {
  console.log("Shutting down gracefully...");
  try {
    await DBController.disconnectDB();
    process.exit(0); // Выходим с кодом успешного завершения
  } catch (error) {
    console.error("Error during graceful shutdown:", error);
    process.exit(1); // Выходим с ненулевым кодом в случае ошибки
  }
}

process.on("SIGINT", gracefulShutdown);
// setTimeout(start, 2000)
nodemon({ script: "" }).on("restart", gracefulShutdown);

start();
