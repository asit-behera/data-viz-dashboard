import { CustomerService } from "./index";
/* import {
  formatTable,
  formatPieChart,
  formatStackedBarChart,
} from "./industry.utils"; */

import { NextFunction, Request, Response } from "express";
import formatTable from "../../utils/TableFormatter.util";
import { successResponse } from "../../utils/Response";
import { AppError } from "../../utils/AppError";

const getCustomerTypes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const view = req.query.view;
    if (!view) throw new AppError("view is required", 400);

    const data = await CustomerService.getCustomerTypesData(); // raw json

    let result;

    switch (view) {
      case "pie":
        //result = formatPieChart(data);
        break;
      case "bar":
        //result = formatStackedBarChart(data);
        break;
      case "table":
        result = formatTable(data, "Cust_Type");
        break;
    }

    res.json(successResponse(result));
  } catch (err) {
    next(err);
  }
};

export default { getCustomerTypes };
