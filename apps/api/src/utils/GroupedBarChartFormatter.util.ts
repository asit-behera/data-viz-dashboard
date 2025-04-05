import { FormattedData } from "./TableFormatter.util";

export default function formatGroupedBarChart(rawData: FormattedData) {
  const chartData = [];

  for (const key in rawData.keys) {
    for (const quarter of rawData.sortedQuarters)
      if (rawData.data[key][quarter])
        chartData.push({
          x: quarter,
          y: rawData.data[key][quarter]["acv"],
          group: rawData.keys[key],
        });
  }
  return chartData;
}
