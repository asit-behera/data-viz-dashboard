import { CustomerService } from "./index";
import { NextFunction, Request, Response } from "express";
import formatTable from "../../utils/TableFormatter.util";
import { successResponse } from "../../utils/Response";
import { AppError } from "../../utils/AppError";
import formatPieChart from "../../utils/PiechartFormatter.util";
import formatGroupedBarChart from "../../utils/GroupedBarChartFormatter.util";

const getCustomerTypes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const view = req.query.view;
    if (!view) throw new AppError("view is required", 400);

    const data = await CustomerService.getCustomerTypesData(); // raw json

    let result: any = formatTable(data, "Cust_Type");

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

export default { getCustomerTypes };
