import { FormattedData } from "../../utils/TableFormatter.util";

//Average Deal Size per quarter
export default function generateLineChartData(rawData: FormattedData) {
  const result = [];
  for (const quarter of rawData.sortedQuarters)
    if (Object.hasOwn(rawData.quarterTotal, quarter))
      result.push({
        x: quarter,
        y: Math.round(
          rawData.quarterTotal[quarter].acv / rawData.quarterTotal[quarter].opps
        ),
        data: rawData.quarterTotal[quarter],
      });

  return result;
}
