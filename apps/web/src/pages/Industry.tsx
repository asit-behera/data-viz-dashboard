import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../config/store";
import { Table } from "../components";
import { Grid, Paper } from "@mui/material";
import { DoughnutChartWrapper, GroupBarChartWrapper } from "../charts";
import {
  fetchIndustryBarData,
  fetchIndustryPieData,
  fetchIndustryTableData,
} from "../features/industry/industryThunks";
import SkeletonLoader from "../components/SkeletonLoader";

function Industry() {
  const dispatch = useAppDispatch();
  const {
    industryData,
    loading,
    /* error, */
    industryBarData,
    isIndustryBardataLoading,
    industryPieData,
    isIndustryPieDataLoading,
  } = useAppSelector((state) => state.industry);

  useEffect(() => {
    if (!industryData) dispatch(fetchIndustryTableData());
    if (!industryBarData) dispatch(fetchIndustryBarData());
    if (!industryPieData) dispatch(fetchIndustryPieData());
  }, [dispatch]);

  if (loading || isIndustryBardataLoading || isIndustryPieDataLoading)
    return <SkeletonLoader />;

  return (
    <Grid container spacing={1}>
      <Grid size={12}>Industry</Grid>
      <Grid size={{ sm: 12, md: 8 }}>
        <Paper elevation={0}>
          {!isIndustryBardataLoading && industryBarData && (
            <GroupBarChartWrapper
              height={400}
              data={industryBarData}
              xAxisLabel={"Closed Fiscal Quarter"}
              yAxisLabel={"ACV"}
            />
          )}
        </Paper>
      </Grid>
      <Grid size={{ sm: 12, md: 4 }}>
        <Paper elevation={0}>
          {!isIndustryPieDataLoading && industryPieData && (
            <DoughnutChartWrapper
              widthScaling={1}
              height={400}
              data={industryPieData}
              showLabels={false}
            />
          )}
        </Paper>
      </Grid>
      <Grid size={12}>
        {!loading && industryData && <Table tableData={industryData} />}
      </Grid>
    </Grid>
  );
}

export default Industry;
