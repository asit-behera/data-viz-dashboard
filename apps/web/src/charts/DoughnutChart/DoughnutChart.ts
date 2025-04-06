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

const defaultFormatter = (d: DoughnutData) =>
  `${d.label} (${d.percent}%)\n$${d3.format(".2s")(d.value)}`;

const htmlFormatter = (d: DoughnutData) =>
  `<div style="color:black;"><strong>${d.label}</strong> (${d.percent}%)<br><span>$${d3.format(".2s")(d.value)}</span></div>`;

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

  // Create tooltip if not exists
  let tooltip: d3.Selection<HTMLDivElement, unknown, HTMLElement, any> = d3
    .select("body")
    .select<HTMLDivElement>(".doughnut-tooltip");

  if (tooltip.empty()) {
    tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "doughnut-tooltip")
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

  g.selectAll("path")
    .data(pieData)
    .enter()
    .append("path")
    .attr("d", arc)
    .attr("fill", (d) => colorScale(d.data.label))
    .on("mouseover", function (_e, d) {
      tooltip.style("visibility", "visible").html(htmlFormatter(d.data));
      d3.select(this)
        .transition()
        .duration(200)
        .attr("transform", function () {
          const dist = 10;
          const midAngle = (d.startAngle + d.endAngle) / 2;
          const x = Math.sin(midAngle) * dist;
          const y = -Math.cos(midAngle) * dist;
          return `translate(${x},${y})`;
        });
    })
    .on("mousemove", function (event) {
      tooltip
        .style("top", event.pageY + 10 + "px")
        .style("left", event.pageX + 10 + "px");
    })
    .on("mouseout", function () {
      tooltip.style("visibility", "hidden");
      d3.select(this)
        .transition()
        .duration(200)
        .attr("transform", "translate(0,0)");
    });

  if (showLabels) {
    const labelRadius = radius * 1.1;

    const labelNodes = pieData.map((d) => {
      const angle = (d.startAngle + d.endAngle) / 2;
      const x = labelRadius * (angle < Math.PI ? 1 : -1);
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
    .text(`$${d3.format(".2s")(total)}`)
    .attr("fill", theme.palette.text.primary);

  return svgRef ? undefined : svg.node();
};

export default createDoughnutChart;
