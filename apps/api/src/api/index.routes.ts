import { Router } from "express";
import { IndustryRoutes, IndustryService } from "./Industry";
import { CustomerRoutes, CustomerService } from "./Customer";
import { AcvRangeRoutes, AcvRangeService } from "./AcvRange";
import { TeamRoutes, TeamService } from "./Team";
import formatTable from "../utils/TableFormatter.util";
import { successResponse } from "../utils/Response";

const router = Router();

/**
 * @openapi
 * tags:
 *    name: Misc
 *    description: This category holds the API's that doesn't fit into any other category
 */
/**
 * @openapi
 * /:
 *  get:
 *      summary: This Api gives Performance Comparison Between previous and second last quarters
 *      tags: [Misc]
 *      responses:
 *          '200':
 *              description: Success
 *
 */
/**
 * ! Note: This idea came up at the last minute, so the code might be messy and poorly organized.
 */
router.get("/", async (req, res, next) => {
  try {
    const acv_rawData = await AcvRangeService.getAcvRangeData();
    let acvTabData: any = formatTable(acv_rawData, "ACV_Range");

    const cust_rawData = await CustomerService.getCustomerTypesData();
    let custTabData: any = formatTable(cust_rawData, "Cust_Type");

    const industry_rawData = await IndustryService.getIndustryData();
    let industryTabData: any = formatTable(industry_rawData, "Acct_Industry");

    const team_rawData = await TeamService.getTeamsData();
    let teamTabData: any = formatTable(team_rawData, "Team");

    const previousQuarter = acvTabData.sortedQuarters.pop();
    const secondLastQuarter = acvTabData.sortedQuarters.pop();

    console.log({
      previousQuarter,
      secondLastQuarter,
    });

    const result: any = {
      industry: {},
      customer: {},
      acv: {},
      team: {},
    };

    const resultKeys: any = {
      industry: [],
      customer: [],
      acv: [],
      team: [],
    };

    for (const key in industryTabData.keys) {
      if (
        industryTabData.data[key][previousQuarter] &&
        industryTabData.data[key][secondLastQuarter]
      ) {
        const cp = industryTabData.data[key][previousQuarter].acv;
        const pp = industryTabData.data[key][secondLastQuarter].acv;
        result.industry[key] = Math.round(((cp - pp) / pp) * 100);
      }
      resultKeys.industry.push(key);
    }

    console.log(resultKeys);

    for (const key in custTabData.keys) {
      if (
        custTabData.data[key][previousQuarter] &&
        custTabData.data[key][secondLastQuarter]
      ) {
        const cp = custTabData.data[key][previousQuarter].acv;
        const pp = custTabData.data[key][secondLastQuarter].acv;
        result.customer[key] = Math.round(((cp - pp) / pp) * 100);
      }
      resultKeys.customer.push(key);
    }

    for (const key in acvTabData.keys) {
      if (
        acvTabData.data[key][previousQuarter] &&
        acvTabData.data[key][secondLastQuarter]
      ) {
        const cp = acvTabData.data[key][previousQuarter].acv;
        const pp = acvTabData.data[key][secondLastQuarter].acv;
        result.acv[key] = Math.round(((cp - pp) / pp) * 100);
      }
      resultKeys.acv.push(key);
    }

    for (const key in teamTabData.keys) {
      if (
        teamTabData.data[key][previousQuarter] &&
        teamTabData.data[key][secondLastQuarter]
      ) {
        const cp = teamTabData.data[key][previousQuarter].acv;
        const pp = teamTabData.data[key][secondLastQuarter].acv;
        result.team[key] = Math.round(((cp - pp) / pp) * 100);
      }
      resultKeys.team.push(key);
    }

    res.json(
      successResponse({
        result,
        resultKeys,
        previousQuarter,
        secondLastQuarter,
      })
    );
  } catch (error) {
    next(error);
  }
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
