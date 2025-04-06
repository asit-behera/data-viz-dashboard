import * as d3 from "d3";

export type HorizontalBarDatum = {
  label: string;
  value: number;
};

/* 

const horizontalBarData = [
  { label: "Retail", value: 120000 },
  { label: "Finance", value: 80000 },
  { label: "Manufacturing", value: 50000 },
];

*/

interface HorizontalBarChartArgs {
  data: HorizontalBarDatum[];
  svgRef?: React.RefObject<SVGSVGElement | null>;
  width: number;
  height?: number;
}

const createHorizontalBarChart = ({
  data,
  svgRef,
  width,
  height = 500,
}: HorizontalBarChartArgs) => {
  if (!data) return;

  const svg = svgRef?.current
    ? d3.select(svgRef.current)
    : d3.select(document.createElementNS("http://www.w3.org/2000/svg", "svg"));

  svg.selectAll("*").remove();

  const margin = { top: 40, right: 30, bottom: 40, left: 100 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const g = svg
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Scales
  const yScale = d3
    .scaleBand()
    .domain(data.map((d) => d.label))
    .range([0, chartHeight])
    .padding(0.2);

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.value)!])
    .nice()
    .range([0, chartWidth]);

  const colorScale = d3
    .scaleOrdinal(d3.schemeTableau10)
    .domain(data.map((d) => d.label));

  // Axes
  g.append("g").call(d3.axisLeft(yScale));
  g.append("g")
    .attr("transform", `translate(0,${chartHeight})`)
    .call(d3.axisBottom(xScale).ticks(5).tickFormat(d3.format(".2s")));

  // Bars
  g.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("y", (d) => yScale(d.label)!)
    .attr("x", 0)
    .attr("height", yScale.bandwidth())
    .attr("width", (d) => xScale(d.value))
    .attr("fill", (d) => colorScale(d.label));

  // Optional: Value labels
  g.selectAll("text.value")
    .data(data)
    .enter()
    .append("text")
    .attr("class", "value")
    .attr("x", (d) => xScale(d.value) + 5)
    .attr("y", (d) => yScale(d.label)! + yScale.bandwidth() / 2 + 5)
    .attr("font-size", "12px")
    .attr("fill", "#333")
    .text((d) => d3.format(".2s")(d.value));

  return svgRef ? undefined : svg.node();
};

export default createHorizontalBarChart;
