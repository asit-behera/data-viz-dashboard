import { Router } from "express";
import { AcvRangeController } from "./index";

const router = Router();

/**
 * @openapi
 * /acv-ranges/:
 *  get:
 *      summary:
 *      tags: [ACV Ranges]
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
router.get("/", AcvRangeController.getAcvRange);

export default router;
