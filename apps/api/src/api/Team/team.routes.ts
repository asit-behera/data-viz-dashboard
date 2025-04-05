import { Router } from "express";
import { TeamController } from "./index";

const router = Router();

/**
 * @openapi
 * /teams/:
 *  get:
 *      summary:
 *      tags: [Teams]
 *      parameters:
 *      -   in: query
 *          name: view
 *          required: true
 *          schema:
 *              type: string
 *              enum: [pie,bar,table]
 *      responses:
 *          '200':
 *              description: Success
 *
 */
router.get("/", TeamController.getTeam);

export default router;
