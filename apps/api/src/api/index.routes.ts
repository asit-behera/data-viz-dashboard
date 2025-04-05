import { Router } from "express";
import { IndustryRoutes } from "./Industry";
import { CustomerRoutes } from "./Customer";
import { AcvRangeRoutes } from "./AcvRange";
import { TeamRoutes } from "./Team";

const router = Router();

router.get("/", async (req, res, next) => {
  res.send({ message: "Ok! Api is working 🚀" });
});

/**
 * @openapi
 * tags:
 *    name: Industry
 *    description:
 */
router.use("/industry", IndustryRoutes);

/**
 * @openapi
 * tags:
 *    name: Customers
 *    description:
 */
router.use("/customers", CustomerRoutes);

/**
 * @openapi
 * tags:
 *    name: Teams
 *    description:
 */
router.use("/teams", TeamRoutes);

/**
 * @openapi
 * tags:
 *    name: ACV Ranges
 *    description:
 */
router.use("/acv-ranges", AcvRangeRoutes);

export default router;
