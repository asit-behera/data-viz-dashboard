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

function Industry() {
  const dispatch = useAppDispatch();
  const {
    industryData,
    loading,
    error,
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

  return (
    <Grid container spacing={1}>
      <Grid size={12}>Industry</Grid>
      <Grid size={{ sm: 12, md: 7 }}>
        <Paper elevation={0}>
          {!isIndustryBardataLoading && industryBarData && (
            <GroupBarChartWrapper height={400} data={industryBarData} />
          )}
        </Paper>
      </Grid>
      <Grid size={{ sm: 12, md: 5 }}>
        <Paper elevation={0}>
          {!isIndustryPieDataLoading && industryPieData && (
            <DoughnutChartWrapper
              widthScaling={1}
              height={400}
              data={industryPieData}
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
