import * as d3 from "d3";

export type DoughnutData = {
  label: string;
  value: number;
  percent: number;
};

export type DoughnutDataMeta = { data: DoughnutData[]; total: number };

type DoughnutChartArgs = {
  data: { data: DoughnutData[]; total: number };
  svgRef?: React.RefObject<SVGSVGElement | null>;
  width: number;
  height?: number;
  innerRadiusRatio?: number;
  showLabels?: boolean;
  formatLabel?: (d: DoughnutData) => string;
  theme: any;
};

const defaultFormatter = (d: DoughnutData) => `${d.label} (${d.percent}%)`;

const createDoughnutChart = ({
  data: { data, total },
  svgRef,
  width,
  height = 500,
  innerRadiusRatio = 0.5,
  showLabels = true,
  theme,
  formatLabel = defaultFormatter,
}: DoughnutChartArgs) => {
  if (!data.length) return;
  if (!svgRef) return;

  const radius = Math.min(width, height) / 2 - 40;
  const innerRadius = radius * innerRadiusRatio;

  const colorScale = d3
    .scaleOrdinal<string>()
    .domain(data.map((d) => d.label))
    .range(d3.schemeTableau10);

  const pie = d3
    .pie<DoughnutData>()
    .value((d) => d.value)
    .sort(null);

  const arc = d3
    .arc<d3.PieArcDatum<DoughnutData>>()
    .innerRadius(innerRadius)
    .outerRadius(radius);

  const labelArc = d3
    .arc<d3.PieArcDatum<DoughnutData>>()
    .innerRadius(radius * 0.9)
    .outerRadius(radius * 0.9);

  const svg = svgRef?.current
    ? d3.select(svgRef.current)
    : d3.select(document.createElementNS("http://www.w3.org/2000/svg", "svg"));

  svg
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMidYMid meet");
  svg.selectAll("*").remove();

  const g = svg
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  const pieData = pie(data);

  /* const arcs = */
  g.selectAll("path")
    .data(pieData)
    .enter()
    .append("path")
    .attr("d", arc)
    .attr("fill", (d) => colorScale(d.data.label));

  if (showLabels) {
    const labelRadius = radius * 1.1;

    const labelNodes = pieData.map((d) => {
      const angle = (d.startAngle + d.endAngle) / 2;
      const x = labelRadius * (angle < Math.PI ? 1 : -1); // left or right
      const y = labelArc.centroid(d)[1];
      return {
        x,
        y,
        angle,
        data: d.data,
        original: d,
      };
    });

    const simulation = d3
      .forceSimulation(labelNodes)
      .force("y", d3.forceY((d) => d.y ?? 0).strength(0.001))
      .force("collide", d3.forceCollide(10))
      .stop();

    for (let i = 0; i < 200; ++i) simulation.tick();

    g.selectAll("polyline")
      .data(labelNodes)
      .enter()
      .append("polyline")
      .attr("stroke", theme.palette.text.primary)
      .attr("stroke-width", 1)
      .attr("fill", "none")
      .attr("points", (d) => {
        const posA = arc.centroid(d.original);
        const posB = labelArc.centroid(d.original);
        const posC = [d.x, d.y];
        return [posA, posB, posC].map((p) => p.join(",")).join(" ");
      });

    g.selectAll("text")
      .data(labelNodes)
      .enter()
      .append("text")
      .each(function (d) {
        const lines = formatLabel(d.data).split("\n");
        lines.forEach((line, i) => {
          d3.select(this)
            .append("tspan")
            .text(line)
            .attr("x", 0)
            .attr("dy", i === 0 ? 0 : "1.2em")
            .attr("fill", theme.palette.text.primary);
        });
      })
      .attr("transform", (d) => `translate(${d.x}, ${d.y})`)
      .style("text-anchor", (d) => (d.angle < Math.PI ? "start" : "end"))
      .style("alignment-baseline", "middle")
      .style("font-size", "12px");
  }

  g.append("text")
    .attr("text-anchor", "middle")
    .style("font-size", "14px")
    .style("font-weight", "bold")
    .attr("dy", "-0.4em")
    .text("Total")
    .attr("fill", theme.palette.text.primary);

  g.append("text")
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .attr("dy", "1em")
    .text(`$${total}K`)
    .attr("fill", theme.palette.text.primary);

  /*   const legend = svg
    .append("g")
    .attr(
      "transform",
      `translate(${width - 150}, ${height / 2 - data.length * 10})`
    )
    .selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("transform", (_, i) => `translate(0, ${i * 20})`);

  legend
    .append("rect")
    .attr("width", 15)
    .attr("height", 15)
    .attr("fill", (d) => colorScale(d.label));

  legend
    .append("text")
    .attr("x", 20)
    .attr("y", 10)
    .text((d) => d.label)
    .style("font-size", "12px")
    .attr("alignment-baseline", "middle"); */

  return svgRef ? undefined : svg.node();
};

export default createDoughnutChart;
