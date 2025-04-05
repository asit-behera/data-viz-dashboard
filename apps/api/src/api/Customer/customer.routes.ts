import { Router } from "express";
import { CustomerController } from "./index";

const router = Router();

/**
 * @openapi
 * /customers/:
 *  get:
 *      summary:
 *      tags: [Customers]
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
router.get("/", CustomerController.getCustomerTypes);

export default router;
