import { TeamService } from "./index";
/* import {
  formatTable,
  formatPieChart,
  formatStackedBarChart,
} from "./industry.utils"; */

import { NextFunction, Request, Response } from "express";
import formatTable from "../../utils/TableFormatter.util";
import { AppError } from "../../utils/AppError";
import { successResponse } from "../../utils/Response";
import formatPieChart from "../../utils/PiechartFormatter.util";
import formatGroupedBarChart from "../../utils/GroupedBarChartFormatter.util";

const getTeam = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const view = req.query.view;
    if (!view) throw new AppError("view is required", 400);

    const data = await TeamService.getTeamsData(); // raw json

    let result: any = formatTable(data, "Team");

    switch (view) {
      case "pie":
        result = formatPieChart(result);
        break;
      case "bar":
        result = formatGroupedBarChart(result);
        break;
      case "table":
        break;
      default:
        throw new AppError("Bad value for view", 400);
    }

    res.json(successResponse(result));
  } catch (err) {
    next(err);
  }
};

export default { getTeam };
