import * as d3 from "d3";

export type SingleLineDataPoint = {
  x: string;
  y: number;
  data: {
    opps: number;
    acv: number;
    percent: number;
  };
};

type ChartOptions = {
  width: number;
  height?: number;
  svgRef: React.RefObject<SVGSVGElement | null>;
  color?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  theme: any;
};

const htmlFormatter = (d: SingleLineDataPoint) =>
  `<div style="color: black; font-family: sans-serif;">
    <div><strong>Quarter:</strong> ${d.x}</div>
    <div><strong>Opportunities:</strong> ${d.data.opps}</div>
    <div><strong>Total ACV:</strong> $${d3.format(",")(d.data.acv)}</div>
    <div><strong>Avg. ACV per Opp:</strong> $${d3.format(",.2f")(d.y)}</div>
  </div>`;

export default function createSingleLineChart(
  data: SingleLineDataPoint[],
  {
    svgRef,
    width,
    height = 500,
    color = "steelblue",
    xAxisLabel,
    yAxisLabel,
    theme,
  }: ChartOptions
) {
  if (data.length === 0) return;

  const margin = { top: 20, right: 30, bottom: 50, left: 60 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const svg = svgRef?.current
    ? d3.select(svgRef.current)
    : d3.select(document.createElementNS("http://www.w3.org/2000/svg", "svg"));

  svg.selectAll("*").remove();
  svg.attr("width", width).attr("height", height);

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Tooltip
  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "d3-tooltip")
    .style("position", "absolute")
    .style("background", "#fff")
    .style("padding", "6px 10px")
    .style("border", "1px solid #ccc")
    .style("border-radius", "4px")
    .style("pointer-events", "none")
    .style("font-size", "12px")
    .style("box-shadow", "0 2px 4px rgba(0,0,0,0.1)")
    .style("opacity", 0);

  // Scales
  const xScale = d3
    .scalePoint()
    .domain(data.map((d) => d.x))
    .range([0, chartWidth])
    .padding(0.5);

  const yMax = d3.max(data, (d) => d.y) || 100;
  const yScale = d3
    .scaleLinear()
    .domain([0, yMax])
    .nice()
    .range([chartHeight, 0]);

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
    .attr("stroke", "#ccc")
    .attr("stroke-dasharray", "2,2");

  // Axes
  const xAxis = g
    .append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(d3.axisBottom(xScale));

  const yAxis = g
    .append("g")
    .call(d3.axisLeft(yScale).tickFormat((d) => `$${d3.format(".2s")(d)}`));

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
      .attr("y", 15)
      .attr("x", 0 - height / 2)
      .style("text-anchor", "middle")
      .style("fill", theme.palette.text.primary)
      .style("font-size", "14px")
      .text(yAxisLabel);
  }

  // Line path
  const line = d3
    .line<SingleLineDataPoint>()
    .x((d) => xScale(d.x)!)
    .y((d) => yScale(d.y))
    .curve(d3.curveMonotoneX);

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
    .attr("class", "dot")
    .attr("cx", (d) => xScale(d.x)!)
    .attr("cy", (d) => yScale(d.y))
    .attr("r", 4)
    .attr("fill", color)
    .on("mouseover", function (event, d) {
      tooltip.style("opacity", 1).html(htmlFormatter(d));
      d3.select(this).attr("r", 6);
    })
    .on("mousemove", (event) => {
      tooltip
        .style("left", `${event.pageX + 10}px`)
        .style("top", `${event.pageY - 28}px`);
    })
    .on("mouseout", function () {
      tooltip.style("opacity", 0);
      d3.select(this).attr("r", 4);
    });

  return svgRef ? undefined : svg.node();
}
