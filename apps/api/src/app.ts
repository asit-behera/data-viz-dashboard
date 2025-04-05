/**
 * * This file is used to configure the express app
 * * Basically we can instanciate Express app and set app level middlewares in this file
 */
import { json, urlencoded } from "body-parser";
import express, { type Express } from "express";
import morgan from "morgan";
import cors from "cors";
import path from "node:path";
import { specs } from "./config/swagger.config";
import swaggerUi from "swagger-ui-express";
import Routes from "./api/index.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app
  .disable("x-powered-by")
  .use(morgan("dev"))
  .use(urlencoded({ extended: true }))
  .use(json())
  .use(cors());

/**
 * * API documentation using swagger
 */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

/**
 * * API routes.
 */
app.use("/api", Routes);

/**
 * * Health Check endpoint.
 * * This is needed to restrich render to shutdown my app on being ideal.
 * * Running a cron to hit this endpoint to keep my service alive and to avoild cold starts.
 */
app.get("/health", (req, res) => {
  return res.json({ message: "All OK!", status: "success" });
});

// 👇 Error handler must come last
app.use(errorHandler);

/**
 * ! This is not the ideal way to host static files.
 * * I understand that these files should be served behind a CDN or a load balancer.
 * * But for this project, it makes sense.
 *
 * * I kept static serving at the end because if we hit a bad endpoint,
 * * the 404 error will simply fall back to React Router.
 */
app.use(express.static(path.resolve(__dirname, "web")));

export default app;
