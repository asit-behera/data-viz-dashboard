import * as d3 from "d3";

export interface HeatmapDataPoint {
  x: string;
  y: string;
  value: number;
}

interface HeatmapOptions {
  svgRef: React.RefObject<SVGSVGElement | null>;
  width: number;
  height?: number;
  //colorRange?: [string, string];
}

export default function createHeatmapChart(
  data: HeatmapDataPoint[],
  {
    svgRef,
    width,
    height = 500,
    //colorRange = ["#e0f3f8", "#08589e"],
  }: HeatmapOptions
) {
  if (data.length === 0) return;

  const svg = svgRef?.current
    ? d3.select(svgRef.current)
    : d3.select(document.createElementNS("http://www.w3.org/2000/svg", "svg"));
  svg.selectAll("*").remove();

  const margin = { top: 40, right: 30, bottom: 40, left: 80 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const g = svg
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Get unique x and y labels
  const xLabels = Array.from(new Set(data.map((d) => d.x)));
  const yLabels = Array.from(new Set(data.map((d) => d.y)));

  // Scales
  const xScale = d3
    .scaleBand()
    .domain(xLabels)
    .range([0, chartWidth])
    .padding(0.05);
  const yScale = d3
    .scaleBand()
    .domain(yLabels)
    .range([0, chartHeight])
    .padding(0.05);

  const maxValue = d3.max(data, (d) => d.value) || 1;
  const colorScale = d3
    .scaleLinear<string>()
    .domain([0, maxValue])
    .range(d3.schemeTableau10);

  // Draw cells
  g.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d) => xScale(d.x)!)
    .attr("y", (d) => yScale(d.y)!)
    .attr("width", xScale.bandwidth())
    .attr("height", yScale.bandwidth())
    .attr("fill", (d) => colorScale(d.value));

  // Add value text
  g.selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .attr("x", (d) => xScale(d.x)! + xScale.bandwidth() / 2)
    .attr("y", (d) => yScale(d.y)! + yScale.bandwidth() / 2)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .text((d) => d.value)
    .style("fill", "#fff")
    .style("font-size", "12px");

  // X axis
  g.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(d3.axisBottom(xScale));

  // Y axis
  g.append("g").call(d3.axisLeft(yScale));

  return svgRef ? undefined : svg.node();
}
