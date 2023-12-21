import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import morgan from "morgan";
import connectionDB from "./db/db.js";
import router from "./routes/index.routes.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use("/api", router);

app.listen(PORT, async () => {
  await connectionDB();
  return console.log(`Express listen in port ${PORT}`);
});
