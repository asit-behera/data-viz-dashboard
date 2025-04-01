/**
 * * This file is used to configure the express app
 * * Basically we can instanciate Express app and set app level middlewares in this file
 */
import { json, urlencoded } from "body-parser";
import express, { type Express } from "express";
import morgan from "morgan";
import cors from "cors";
import path from "node:path";

const app = express();

app
  .disable("x-powered-by")
  .use(morgan("dev"))
  .use(urlencoded({ extended: true }))
  .use(json())
  .use(cors());

/**
 * * API routes.
 */
app.get("/api/:name", (req, res) => {
  return res.json({ message: `hello ${req.params.name}` });
});

/**
 * ! This is not the ideal way to host static files.
 * * I understand that these files should be served behind a CDN or a load balancer.
 * * But for this project, it makes sense.
 *
 * * I kept static serving at the end because if we hit a bad endpoint,
 * * the 404 error will simply fall back to React Router.
 */
app.use("/", express.static(path.resolve(__dirname, "web")));

export default app;
