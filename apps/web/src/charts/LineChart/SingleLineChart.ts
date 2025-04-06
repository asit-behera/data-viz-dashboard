import * as d3 from "d3";

export interface SingleLineDataPoint {
  x: string;
  y: number;
}

interface ChartOptions {
  width: number;
  height?: number;
  svgRef: React.RefObject<SVGSVGElement | null>;
  color?: string;
}

export default function createSingleLineChart(
  data: SingleLineDataPoint[],
  { svgRef, width, height = 500, color = "steelblue" }: ChartOptions
) {
  if (data.length === 0) return;

  const svg = svgRef?.current
    ? d3.select(svgRef.current)
    : d3.select(document.createElementNS("http://www.w3.org/2000/svg", "svg"));
  svg.selectAll("*").remove();

  // Set margins
  const margin = { top: 20, right: 30, bottom: 40, left: 50 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const g = svg
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Scales
  const xScale = d3
    .scalePoint()
    .domain(data.map((d) => d.x))
    .range([0, chartWidth])
    .padding(0.5);

  const yMax = d3.max(data, (d) => d.y) || 100;
  const yScale = d3.scaleLinear().domain([0, yMax]).range([chartHeight, 0]);

  // Line generator
  const line = d3
    .line<SingleLineDataPoint>()
    .x((d) => xScale(d.x)!)
    .y((d) => yScale(d.y))
    .curve(d3.curveMonotoneX);

  // Axes
  g.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(d3.axisBottom(xScale));

  g.append("g").call(d3.axisLeft(yScale));

  // Line path
  g.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", color)
    .attr("stroke-width", 2)
    .attr("d", line);

  // Dots
  g.selectAll(".dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(d.x)!)
    .attr("cy", (d) => yScale(d.y))
    .attr("r", 4)
    .attr("fill", color);

  return svgRef ? undefined : svg.node();
}
