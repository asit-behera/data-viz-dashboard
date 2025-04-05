import { FormattedData } from "./TableFormatter.util";

export default function formatPieChart(rawData: FormattedData) {
  const pieData = [];
  for (const key in rawData.keys) {
    pieData.push({
      label: rawData.keys[key],
      value: rawData.data[key]["total"]["acv"],
      percent: rawData.data[key]["total"]["percent"],
    });
  }
  return { data: pieData, total: rawData["quarterTotal"]["total"]["acv"] };
}
