import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../config/store";
import { fetchACVRangeTableData } from "../features/acvRanges/acvRangesSlice";
import { Table } from "../components";
import { Grid } from "@mui/material";
import { SingleLineChartWrapper, StackedBarChartWrapper } from "../charts";

function AcvRanges() {
  const dispatch = useAppDispatch();
  const { acvRangeData, loading, error } = useAppSelector(
    (state) => state.acvRange
  );

  console.log({ acvRangeData, loading, error });

  useEffect(() => {
    if (!acvRangeData) dispatch(fetchACVRangeTableData());
  }, [dispatch]);

  return (
    <Grid container>
      <Grid size={12}>AcvRanges</Grid>
      <Grid size={6}>
        {/* Average Deal Size */}
        <SingleLineChartWrapper
          height={400}
          data={[
            { x: "2023-Q3", y: 39570 },
            { x: "2023-Q4", y: 28326 },
            { x: "2024-Q1", y: 29355 },
            { x: "2024-Q2", y: 30085 },
          ]}
        />
      </Grid>
      <Grid size={6}>
        <StackedBarChartWrapper
          height={400}
          data={[
            {
              x: "2023-Q3",
              y: 307500,
              group: "$100K - 200K",
            },
            {
              x: "2023-Q4",
              y: 564500,
              group: "$100K - 200K",
            },
            {
              x: "2024-Q1",
              y: 112125,
              group: "$100K - 200K",
            },
            {
              x: "2024-Q2",
              y: 242044,
              group: "$100K - 200K",
            },
            {
              x: "2023-Q3",
              y: 472297,
              group: "$20K - 50K",
            },
            {
              x: "2023-Q4",
              y: 348497,
              group: "$20K - 50K",
            },
            {
              x: "2024-Q1",
              y: 306170,
              group: "$20K - 50K",
            },
            {
              x: "2024-Q2",
              y: 234324,
              group: "$20K - 50K",
            },
            {
              x: "2023-Q3",
              y: 554206,
              group: "$50K - 100K",
            },
            {
              x: "2023-Q4",
              y: 356708,
              group: "$50K - 100K",
            },
            {
              x: "2024-Q1",
              y: 694818,
              group: "$50K - 100K",
            },
            {
              x: "2024-Q2",
              y: 283837,
              group: "$50K - 100K",
            },
            {
              x: "2023-Q3",
              y: 263139,
              group: "<$20K",
            },
            {
              x: "2023-Q4",
              y: 242452,
              group: "<$20K",
            },
            {
              x: "2024-Q1",
              y: 261356,
              group: "<$20K",
            },
            {
              x: "2024-Q2",
              y: 112260,
              group: "<$20K",
            },
            {
              x: "2023-Q3",
              y: 708200,
              group: ">=$200K",
            },
            {
              x: "2024-Q1",
              y: 298767,
              group: ">=$200K",
            },
          ]}
        />
      </Grid>

      <Grid size={12}>
        {!loading && acvRangeData && <Table tableData={acvRangeData} />}
      </Grid>
    </Grid>
  );
}

export default AcvRanges;
