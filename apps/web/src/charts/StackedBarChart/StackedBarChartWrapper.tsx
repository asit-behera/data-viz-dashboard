import { useEffect, useRef, useState } from "react";
import { GroupedBarData } from "../GroupedBarChart/GoupedBarChat";
import createStackedBarChart from "./StackedBarChart";
import { useTheme } from "@mui/material";

export const StackedBarChartWrapper = ({
  data,
  widthScaling = 1,
  height,
}: {
  data: GroupedBarData[];
  widthScaling?: number;
  height?: number;
}) => {
  const theme = useTheme();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 300 });

  // Resize observer to make it dynamic
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width } = entries[0].contentRect;
      setDimensions({ width, height: 300 }); // fixed height or you can make it dynamic too
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!dimensions.width) return;
    if (svgRef.current) {
      createStackedBarChart({
        data,
        svgRef,
        width: dimensions.width / widthScaling,
        height,
        theme,
      });
    }
  }, [data, dimensions, theme.palette.mode]);

  return (
    <div ref={containerRef} style={{ width: "100%" }}>
      <svg
        ref={svgRef}
        style={{
          width: "100%",
        }}
      ></svg>
    </div>
  );
};

export default StackedBarChartWrapper;
