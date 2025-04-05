import { Router } from "express";
import { IndustryController } from "./index";

const router = Router();

/**
 * @openapi
 * /industry/:
 *  get:
 *      summary:
 *      tags: [Industry]
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
router.get("/", IndustryController.getIndustry);

export default router;
