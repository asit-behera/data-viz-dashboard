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
  theme: any;
  xAxisLabel?: string;
  yAxisLabel?: string;
};

const createStackedBarChart = ({
  data,
  svgRef,
  width,
  height = 500,
  getX = (d) => d.x,
  getGroup = (d) => d.group,
  getValue = (d) => d.y,
  theme,
  xAxisLabel,
  yAxisLabel,
}: StackedBarChartOptions<GroupedBarData>) => {
  if (!data || !svgRef.current) return;

  d3.select(svgRef.current).selectAll("*").remove();

  const svg = d3.select(svgRef.current);
  const margin = { top: 40, right: 30, bottom: 60, left: 80 };
  const chartWidth = width - margin.left - margin.right - 120;
  const chartHeight = height - margin.top - margin.bottom;

  const g = svg
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const xValues = Array.from(new Set(data.map(getX))).sort();
  const groups = Array.from(new Set(data.map(getGroup)));

  const preparedData = xValues.map((xVal) => {
    const row: { [key: string]: number | string } = { x: xVal };
    groups.forEach((group) => {
      const entry = data.find((d) => getX(d) === xVal && getGroup(d) === group);
      row[group] = entry ? getValue(entry) : 0;
    });
    return row;
  });

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

  const yMax = d3.max(stackedData, (layer) => d3.max(layer, (d) => d[1])) || 0;
  const yScale = d3
    .scaleLinear()
    .domain([0, yMax])
    .nice()
    .range([chartHeight, 0]);

  const colorScale = d3.scaleOrdinal(d3.schemeTableau10).domain(groups);

  // Gridlines
  g.append("g")
    .attr("class", "grid")
    .call(
      d3
        .axisLeft(yScale)
        .tickSize(-chartWidth)
        .tickFormat(() => "")
    )
    .selectAll("line")
    .attr("stroke", theme.palette.divider);

  // Axes
  g.append("g")
    .attr("transform", `translate(0,${chartHeight})`)
    .call(d3.axisBottom(xScale));

  g.append("g").call(
    d3.axisLeft(yScale).tickFormat((d) => `$${d3.format(".2s")(d)}`)
  );

  // Tooltip
  let tooltip = d3.select("body").select<HTMLDivElement>(".stacked-tooltip");

  if (tooltip.empty()) {
    tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "stacked-tooltip")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .style("background", "white")
      .style("border", "1px solid #ccc")
      .style("border-radius", "4px")
      .style("padding", "6px 10px")
      .style("font-size", "12px")
      .style("pointer-events", "none")
      .style("box-shadow", "0 2px 6px rgba(0,0,0,0.15)");
  }

  // Bars
  g.selectAll(".layer")
    .data(stackedData)
    .enter()
    .append("g")
    .attr("fill", (d) => colorScale(d.key))
    .selectAll("rect")
    .data((d) => d.map((datum) => ({ ...datum, key: d.key })))
    .enter()
    .filter((d) => d[0] !== d[1]) // ✅ filter zero height bars
    .append("rect")
    .attr("x", (d) => xScale((d.data as any).x)!)
    .attr("y", (d) => yScale(d[1]))
    .attr("height", (d) => yScale(d[0]) - yScale(d[1]))
    .attr("width", xScale.bandwidth())
    .on("mouseover", (_e, d) => {
      const value = d[1] - d[0];
      tooltip
        .style("visibility", "visible")
        .html(
          `<div style="color:black;"><strong>${d.key}</strong><br/>Total: $${d3.format(".2s")(value)}</div>`
        );
    })
    .on("mousemove", (event) => {
      tooltip
        .style("top", event.pageY + 10 + "px")
        .style("left", event.pageX + 10 + "px");
    })
    .on("mouseout", () => {
      tooltip.style("visibility", "hidden");
    });

  // X Axis Label
  if (xAxisLabel) {
    svg
      .append("text")
      .attr(
        "transform",
        `translate(${margin.left + chartWidth / 2}, ${height - 10})`
      )
      .style("text-anchor", "middle")
      .style("fill", theme.palette.text.primary)
      .style("font-size", "14px")
      .text(xAxisLabel);
  }

  // Y Axis Label
  if (yAxisLabel) {
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 20)
      .attr("x", 0 - height / 2)
      .style("text-anchor", "middle")
      .style("fill", theme.palette.text.primary)
      .style("font-size", "14px")
      .text(yAxisLabel);
  }

  // Legend
  const legend = svg
    .append("g")
    .attr(
      "transform",
      `translate(${margin.left + chartWidth + 10}, ${margin.top})`
    );

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
      .text(group)
      .style("fill", theme.palette.text.primary);
  });
};

export default createStackedBarChart;
