import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../config/store";
import { Table } from "../components";
import { Grid, Paper } from "@mui/material";
import { SingleLineChartWrapper, StackedBarChartWrapper } from "../charts";
import {
  fetchACVRangeBarChartData,
  fetchACVRangeLineChartData,
  fetchACVRangeTableData,
} from "../features/acvRanges/acvRangesThunks";
import SkeletonLoader from "../components/SkeletonLoader";

function AcvRanges() {
  const dispatch = useAppDispatch();
  const {
    acvRangeTableData,
    isAcvtableDataLoading,

    /* error, */

    acvRangeLineChartData,
    isAcvLineChartDataLoading,

    acvRangeBarChartData,
    isAcvBarChartDataLoading,
  } = useAppSelector((state) => state.acvRange);

  useEffect(() => {
    if (!acvRangeTableData) dispatch(fetchACVRangeTableData());
    if (!acvRangeLineChartData) dispatch(fetchACVRangeLineChartData());
    if (!acvRangeBarChartData) dispatch(fetchACVRangeBarChartData());
  }, [dispatch]);

  if (
    isAcvBarChartDataLoading ||
    isAcvLineChartDataLoading ||
    isAcvtableDataLoading
  )
    return <SkeletonLoader />;

  return (
    <Grid container spacing={1}>
      <Grid size={12}>AcvRanges</Grid>
      <Grid size={{ sm: 12, md: 6 }}>
        <Paper
          elevation={0}
          sx={{
            textAlign: "center",
            pb: 2,
          }}
        >
          {!isAcvLineChartDataLoading && acvRangeLineChartData && (
            <SingleLineChartWrapper
              height={400}
              data={acvRangeLineChartData}
              xAxisLabel={"Closed Fiscal Quarter"}
              yAxisLabel={"Average ACV per oops"}
            />
          )}
        </Paper>
      </Grid>
      <Grid size={{ sm: 12, md: 6 }}>
        <Paper elevation={0}>
          {!isAcvBarChartDataLoading && acvRangeBarChartData && (
            <StackedBarChartWrapper
              height={415}
              data={acvRangeBarChartData}
              xAxisLabel={"Closed Fiscal Quarter"}
              yAxisLabel={"ACV"}
            />
          )}
        </Paper>
      </Grid>

      <Grid size={12}>
        {!isAcvtableDataLoading && acvRangeTableData && (
          <Table tableData={acvRangeTableData} />
        )}
      </Grid>
    </Grid>
  );
}

export default AcvRanges;
