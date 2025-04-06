import * as d3 from "d3";
export type GroupedBarData = {
  x: string;
  y: number;
  group: string;
};

type GroupedBarChartArgs = {
  data: GroupedBarData[];
  svgRef?: React.RefObject<SVGSVGElement | null>;
  width: number;
  height?: number;
  theme: any;
};

const createGroupedBarChart = ({
  data,
  svgRef,
  width,
  height = 500,
  theme,
}: GroupedBarChartArgs) => {
  if (!data.length) return;

  const margin = { top: 40, right: 150, bottom: 50, left: 80 };
  const innerWidth = width - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const groupedData = d3.groups(data, (d) => d.x);
  const industries = Array.from(new Set(data.map((d) => d.group)));
  const colorScale = d3.scaleOrdinal(d3.schemeTableau10).domain(industries);

  const x0 = d3
    .scaleBand()
    .domain(groupedData.map(([key]) => key))
    .range([0, innerWidth])
    .padding(0.1);

  const x1 = d3
    .scaleBand()
    .domain(industries)
    .range([0, x0.bandwidth()])
    .padding(0.05);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.y) || 1])
    .nice()
    .range([innerHeight, 0]);

  const svg = svgRef?.current
    ? d3.select(svgRef.current)
    : d3.select(document.createElementNS("http://www.w3.org/2000/svg", "svg"));

  svg.attr("width", width).attr("height", height);
  svg.selectAll("*").remove();

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  g.append("g")
    .attr("class", "grid")
    .call(
      d3
        .axisLeft(y)
        .tickSize(-innerWidth)
        .tickFormat(() => "")
    )
    .selectAll("line")
    .attr("stroke", theme.palette.divider);
  //.attr("stroke-opacity", 0.5)
  // .attr("stroke-dasharray", "2,2");

  g.append("g")
    .selectAll("g")
    .data(groupedData)
    .enter()
    .append("g")
    .attr("transform", (d) => `translate(${x0(d[0])},0)`)
    .selectAll("rect")
    .data((d) => d[1])
    .enter()
    .append("rect")
    .attr("x", (d) => x1(d.group) || 0)
    .attr("y", (d) => y(d.y))
    .attr("width", x1.bandwidth())
    .attr("height", (d) => innerHeight - y(d.y))
    .attr("fill", (d) => colorScale(d.group));

  g.append("g")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(d3.axisBottom(x0));

  g.append("g").call(
    d3.axisLeft(y).tickFormat((d) => `$${d3.format(".2s")(d)}`)
  );

  const legend = svg
    .append("g")
    .attr("transform", `translate(${innerWidth + 20},${margin.top})`)
    .selectAll("g")
    .data(industries)
    .enter()
    .append("g")
    .attr("transform", (_, i) => `translate(0, ${i * 20})`);

  legend
    .append("rect")
    .attr("width", 15)
    .attr("height", 15)
    .attr("fill", (d) => colorScale(d));

  legend
    .append("text")
    .attr("x", 20)
    .attr("y", 10)
    .text((d) => d)
    .style("font-size", "12px")
    .attr("alignment-baseline", "middle")
    .style("fill", theme.palette.text.primary);

  return svgRef ? undefined : svg.node();
};

export default createGroupedBarChart;
