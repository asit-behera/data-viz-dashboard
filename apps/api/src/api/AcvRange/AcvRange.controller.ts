import { AcvRangeService } from "./index";
import { NextFunction, Request, Response } from "express";
import formatTable from "../../utils/TableFormatter.util";
import { AppError } from "../../utils/AppError";
import { successResponse } from "../../utils/Response";
import formatGroupedBarChart from "../../utils/GroupedBarChartFormatter.util";
import generateLineChartData from "./AcvRangeLineChartFormatter.util";

const getAcvRange = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const view = req.query.view;
    if (!view) throw new AppError("view is required", 400);

    const data = await AcvRangeService.getAcvRangeData(); // raw json

    let result: any = formatTable(data, "ACV_Range");

    switch (view) {
      case "line":
        result = generateLineChartData(result);
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

export default { getAcvRange };
