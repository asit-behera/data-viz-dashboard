import { IndustryService } from "./index";
import { NextFunction, Request, Response } from "express";
import formatTable from "../../utils/TableFormatter.util";
import { successResponse } from "../../utils/Response";
import { AppError } from "../../utils/AppError";
import formatPieChart from "../../utils/PiechartFormatter.util";
import formatGroupedBarChart from "../../utils/GroupedBarChartFormatter.util";

const getIndustry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const view = req.query.view;
    if (!view) throw new AppError("view is required", 400);

    const data = await IndustryService.getIndustryData(); // raw json

    let result: any = formatTable(data, "Acct_Industry");

    switch (view) {
      case "pie":
        result = formatPieChart(result);
        break;
      case "bar":
        result = formatGroupedBarChart(result);
        break;
      /* case "table":
        Removed this case as the formatted table data will be easy to compile for the other charts 
        break; */
    }

    res.json(successResponse(result));
  } catch (err) {
    next(err);
  }
};

export default { getIndustry };
