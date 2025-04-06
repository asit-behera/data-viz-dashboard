import { GroupedBarData } from "../GroupedBarChart/GoupedBarChat";
import * as d3 from "d3";

type StackedBarChartOptions<T> = {
  data: T[];
  svgRef: React.RefObject<SVGSVGElement | null>;
  width: number;
  height?: number;
  getX?: (d: T) => string;
  getGroup?: (d: T) => string;
  getValue?: (d: T) => number;
};

const createStackedBarChart = ({
  data,
  svgRef,
  width,
  height = 500,
  getX = (d) => d.x,
  getGroup = (d) => d.group,
  getValue = (d) => d.y,
}: StackedBarChartOptions<GroupedBarData>) => {
  if (!data || !svgRef.current) return;

  // Clear previous SVG content
  d3.select(svgRef.current).selectAll("*").remove();

  const svg = d3.select(svgRef.current);

  const margin = { top: 40, right: 30, bottom: 60, left: 80 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const g = svg
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const xValues = Array.from(new Set(data.map(getX))).sort();
  const groups = Array.from(new Set(data.map(getGroup)));

  // Build stacked data: only group keys should be numeric
  const preparedData = xValues.map((xVal) => {
    const row: { [key: string]: number | string } = { x: xVal };
    groups.forEach((group) => {
      const entry = data.find((d) => getX(d) === xVal && getGroup(d) === group);
      row[group] = entry ? getValue(entry) : 0;
    });
    return row;
  });

  // Use d3.stack() on numeric-only part
  const stackedData = d3
    .stack<{ [key: string]: number }>()
    .keys(groups)
    .value((d, key) => d[key] as number)(
    preparedData as { [key: string]: number }[]
  );

  const xScale = d3
    .scaleBand()
    .domain(xValues)
    .range([0, chartWidth])
    .padding(0.2);

  const yMax = d3.max(stackedData, (layer) => d3.max(layer, (d) => d[1]))!;
  const yScale = d3
    .scaleLinear()
    .domain([0, yMax])
    .nice()
    .range([chartHeight, 0]);

  const colorScale = d3.scaleOrdinal(d3.schemeTableau10).domain(groups);

  // Axes
  g.append("g")
    .attr("transform", `translate(0,${chartHeight})`)
    .call(d3.axisBottom(xScale));

  g.append("g").call(d3.axisLeft(yScale));

  // Draw bars
  g.selectAll(".layer")
    .data(stackedData)
    .enter()
    .append("g")
    .attr("fill", (d) => colorScale(d.key))
    .selectAll("rect")
    .data((d) => d)
    .enter()
    .append("rect")
    .attr("x", (d) => xScale((d.data as any).x)!)
    .attr("y", (d) => yScale(d[1]))
    .attr("height", (d) => yScale(d[0]) - yScale(d[1]))
    .attr("width", xScale.bandwidth());

  // Legend
  const legend = g
    .append("g")
    .attr("transform", `translate(${chartWidth - 100}, 0)`);

  groups.forEach((group, i) => {
    const legendRow = legend
      .append("g")
      .attr("transform", `translate(0, ${i * 20})`);

    legendRow
      .append("rect")
      .attr("width", 12)
      .attr("height", 12)
      .attr("fill", colorScale(group));

    legendRow
      .append("text")
      .attr("x", 20)
      .attr("y", 10)
      .attr("font-size", "12px")
      .text(group);
  });
};

export default createStackedBarChart;
