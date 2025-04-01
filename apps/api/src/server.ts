import { json, urlencoded } from "body-parser";
import express, { type Express } from "express";
import morgan from "morgan";
import cors from "cors";
import path from "node:path";

export const createServer = (): Express => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors());

  console.log(" PATH :: ", path.resolve(__dirname, "web"));

  app.use("/", express.static(path.resolve(__dirname, "web")));

  app.get("/api/:name", (req, res) => {
    return res.json({ message: `hello ${req.params.name}` });
  });

  return app;
};
